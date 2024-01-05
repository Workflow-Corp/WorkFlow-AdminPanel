from flask import Flask, render_template, request, redirect, session, g
import requests
import json
import logging



base = " https://softeng.eskizzart.com"
#https://softeng.eskizzart.com

app = Flask(__name__)
app.secret_key = "systemSecretKey"



@app.route("/logout")
def logout():
    # Clear the user session
    session.clear()
    # Redirect to the login page or any other page after logout
    return redirect("/login", code=302)

@app.context_processor
def custom_context_processor():
    username = session.get("username")
    data = requests.get("{}/User/GetUserList".format(base)).json()
    user_id = next((user["id"] for user in data if user["username"] == username), None)

    dashboard_check = requests.get("{}/Tag/CheckDashboardAuthorization".format(base), params={"userId": user_id})
    authorization_check = requests.get("{}/Tag/CheckAuthorizationAuthorization".format(base), params={"userId": user_id})
    user_check = requests.get("{}/Tag/CheckUserAuthorization".format(base), params={"userId": user_id})
    group_check = requests.get("{}/Tag/CheckGroupAuthorization".format(base), params={"userId": user_id})
    
    app.logger.info(user_check.text)

    return {
        'dashboard_check': dashboard_check.text,
        'authorization_check': authorization_check.text,
        'user_check': user_check.text,
        'group_check': group_check.text,
    }
    


    







@app.route("/")
def index():
    is_user_logged_in = session.get("logged_in", False)

    if is_user_logged_in:
        data = requests.get("{}/Home/GetDashboard".format(base)).json()

        numberOEmployees = data["numberOEmployees"]
        numberOfGroups = data["numberOfGroups"]
        numberOfActiveTasks = data["numberOfActiveTasks"]
        organizationScore = data["organizationScore"]
        top5PerformersOfMonth = data["top5PerformersOfMonth"]
        totalAveragesMonthly = data["totalAveragesMonthly"]
        groupWorkload = data["groupWorkload"]
        employeeWorkload = data["employeeWorkload"]

       

     
        try:
            groupWorkloadRate = (groupWorkload/(groupWorkload+ employeeWorkload)) *100
            employeeWorkloadRate = (employeeWorkload/(groupWorkload+ employeeWorkload)) *100
        except ZeroDivisionError:
            groupWorkloadRate = 50
            employeeWorkloadRate = 50


      

        return render_template(
            "index.html",
            top5PerformersOfMonth=top5PerformersOfMonth,
            totalAveragesMonthly=totalAveragesMonthly,
            numberOEmployees=numberOEmployees,
            numberOfGroups=numberOfGroups,
            numberOfActiveTasks=numberOfActiveTasks,
            organizationScore=organizationScore,
            groupWorkloadRate=groupWorkloadRate,
            employeeWorkloadRate=employeeWorkloadRate,
        )

    else:
        # Redirect to the login page if the user is not logged in
        return redirect("/login", code=302)


@app.route("/groups", methods=["POST", "GET"])
def groups():
    headers = {"Content-Type": "application/json; charset=utf-8"}

    if request.method == "POST":
        
        
        
        if request.form.get("groupIdAddUser"):
            groupIdAddUser = request.form.get("groupIdAddUser")
            newuserIds = request.form.getlist("add_new_users")
            datauseredited = {"groupId": groupIdAddUser, "userIds": newuserIds}
            requests.post(
            "{}/Group/AddUsersToGroup".format(base), headers=headers, json=datauseredited)
            
            return redirect("/groups")
            
        
        
        groupIdEdit = request.form.get("groupId")
        newleaderId = request.form.get("newGroupleader")
        newgroupname = request.form.get("newGroupname")
        descriptionEdited = request.form.get("new-textarea-input")
        newuserIds = request.form.getlist("new_selected_users")
        dataedited = {
            "id" : groupIdEdit,
            "name": newgroupname,
            "leaderId": newleaderId,
            "description": descriptionEdited,
        }
        
        
        
        requests.post(
            "{}/Group/EditGroup".format(base), headers=headers, json=dataedited
        )

        data2edited = {"groupId": groupIdEdit, "userIds": newuserIds}
       

        requests.post(
            "{}/Group/AddUsersToGroup".format(base), headers=headers, json=data2edited
        )
        
        

        groupname = request.form.get("groupname")
        userIds = request.form.getlist("add_users")
        leaderId = request.form.get("groupleader")
        description = request.form.get("textarea-input")
        creatorusername = session.get("username")
        
        
     

        users = requests.get("{}/User/GetUserList".format(base)).json()
        creatorId = next(
            (item["id"] for item in users if item["username"] == creatorusername), None
        )
        
        
        data = {
        "name": groupname,
        "leaderId": leaderId,
        "description": description,
        "creatorId": creatorId,
        }

        if "name" in data and "leaderId" in data and "description" in data:
        # Send request only if 'name' and 'leaderId' exist in data
            response = requests.post(
                "{}/Group/CreateGroup".format(base), headers=headers, json=data
            ).json()

            groupId = response.get("id")

            if groupId and userIds:
                data2 = {"groupId": groupId, "userIds": userIds}
                requests.post(
                    "{}/Group/AddUsersToGroup".format(base), headers=headers, json=data2
                )
        
        return redirect("/groups")

    data = requests.get("{}/User/GetUserList".format(base)).json()

    groups = requests.get("{}/Group/GetGroupList".format(base)).json()

    page = request.args.get("page", 1, type=int)
    per_page = 5
    start = (page - 1) * per_page
    end = start + per_page
    total_pages = (len(groups) + per_page - 1) // per_page
    items_on_page = groups[start:end]

    return render_template(
        "groups.html",
        data=data,
        groups=items_on_page,
        total_pages=total_pages,
        page=page,
        per_page=per_page,
    )
    
    
@app.route("/groups/group-analytics/<id>")
def group_analytics(id):
    


    
    
    
    taskList = requests.get(
        "{}/Task/GetTaskListByGroupIdGroupPage".format(base), params={"groupId": id}
    ).json()
    
    app.logger.info(taskList)
  
    return render_template("group-analytics.html", id=id, taskList = taskList)



@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        data = {"username": username, "password": password}

        headers = {"Content-Type": "application/json; charset=utf-8"}

        isLoggedIn = requests.post(
            "{}/Home/AdminLogin".format(base), headers=headers, json=data
        ).json()

        if isLoggedIn == True:
            session["logged_in"] = True
            session["username"] = username
            return redirect("/")
        else:
            return redirect("/login")

    return render_template("login.html")


@app.route("/authorizations", methods = ['POST', 'GET'])
def authorizations():
    
    if request.method == 'POST':
        
        
        name = request.form.get("tag-name")
        description = request.form.get("textarea-input")
        hierarchyPoint = request.form.get("HierarchyPoint")
        authIds = request.form.getlist("multiple-select")
        ParentTagIds = request.form.getlist("multiple-select-tags")
        
     
        
        app.logger.info(authIds)
        app.logger.info(ParentTagIds)
        
        
        data = {"name" : name, "description" : description, "hierarchyPoint": int(hierarchyPoint), "authIds" : authIds, "ParentTagIds": ParentTagIds}
        
        headers = {"Content-Type": "application/json; charset=utf-8"} 

        response = requests.post(
            "{}/Tag/CreateTag".format(base), headers=headers, json=data
        ).json()
        
        app.logger.info(data)

      
        if response == True:
            return redirect('/authorizations')
        else:
            return redirect('/error')
        
    
        
    
    
    tagList = requests.get("{}/Tag/GetTagList".format(base)).json()
    authList = requests.get("{}/Auth/GetAuthList".format(base)).json()
    
    return render_template("authorizations.html", tagList = tagList, authList = authList)


@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "POST":
        
        tags = request.form.getlist("add_auths")
        
        username = request.form.get("username")
        password = request.form.get("password")
        FirstName = request.form.get("firstName")
        LastName = request.form.get("lastName")
        Age = request.form.get("age")
        Gender = request.form.get("gender")
        Title = request.form.get("title")
        
        users = requests.get("{}/User/GetUserList".format(base)).json()
        userId = next((user["id"] for user in users if user["username"] == username), None)

        data = {
            "username": username,
            "password": password,
            "FirstName": FirstName,
            "LastName": LastName,
            "Age": Age,
            "Gender": Gender,
            "Title": Title,
        }

        headers = {"Content-Type": "application/json; charset=utf-8"}

        response = requests.post(
            "{}/User/CreateUser".format(base), headers=headers, json=data
        ).json()
        
        if tags:
            dataAuth = {
            "tagIds": tags,
            "userId": userId,
            
            }

            
            response = requests.post(
            "{}/User/CreateUser".format(base), headers=headers, json=dataAuth
            ).json()
            

        newUsername = request.form.get("newUserame")
        newPassword = request.form.get("newPassword")
        title = request.form.get("newTitle")
        id = request.form.get("userId")

        data = {
            "username": newUsername,
            "newPassword": newPassword,
            "title": title,
            "id": id,
        }
        headers = {"Content-Type": "application/json; charset=utf-8"}
        response = requests.post(
            "{}/User/EditUserAsAdmin".format(base), headers=headers, json=data
        )
        app.logger.info(response)
        return redirect("/users")

    data = requests.get("{}/User/GetUserList".format(base)).json()
    # Assuming your JSON structure has a key "data" containing a list of dictionaries

    page = request.args.get("page", 1, type=int)
    per_page = 5
    start = (page - 1) * per_page
    end = start + per_page
    total_pages = (len(data) + per_page - 1) // per_page
    items_on_page = data[start:end]
    
    tagList = requests.get("{}/Tag/GetTagList".format(base)).json()
    
    

    return render_template(
        "users.html",
        data=items_on_page,
        total_pages=total_pages,
        page=page,
        per_page=per_page,
        tagList = tagList
    )


@app.route("/users/user-analytics/<id>")
def user_analytics(id):
    
    
    
    performance12 = requests.get(
        "{}/Performance/GetLast12MonthPerformanceMetricsByUserId".format(base), params={"userId": id}
    ).json()
    taskList = requests.get(
        "{}/Task/GetTaskListByUserIdUserPage".format(base), params={"userId": id}
    ).json()
    return render_template("user-analytics.html", id=id, taskList=taskList, performance12 = performance12)


@app.route("/delete_user/<id>")
def delete_user(id):
    data = {"id" : id}
    response = requests.post(
        "{}/User/DeleteUser".format(base), json=data
    )
    
    return redirect('/users')

  

if __name__ == "__main__":
    app.run(debug=True)
