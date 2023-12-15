;-------------------------------------------------------------------------------
; MSP430 Assembler Code Template for use with TI Code Composer Studio
;
;
;-------------------------------------------------------------------------------
            .cdecls C,LIST,"msp430.h"       ; Include device header file

;-------------------------------------------------------------------------------
            .def    RESET                   ; Export program entry-point to
                                            ; make it known to linker.
;-------------------------------------------------------------------------------
            .text                           ; Assemble into program memory.
            .retain                         ; Override ELF conditional linking
                                            ; and retain current section.
            .retainrefs                     ; And retain any sections that have
                                            ; references to current section.

;-------------------------------------------------------------------------------
RESET       mov.w   #__STACK_END,SP         ; Initialize stackpointer
StopWDT     mov.w   #WDTPW|WDTHOLD,&WDTCTL  ; Stop watchdog timer



Setup		mov.b #0ffh, &P1DIR
            mov.b #0ffh, &P2DIR
            mov.b #00000000b, &P2SEL
            mov.b #00000000b, &P2SEL2
            clr.b &P1OUT
            clr.b &P2OUT


            ;implementation of the flow chart in the experiment document.
InitLCD     mov &Delay100ms, R15 ;Wait 100ms
            call #Delay

            mov.b #00110000b, &P1OUT ;Send 0011
            call #TrigEn
            mov &Delay4ms, R15 ;Wait 4ms
            call #Delay

            call #TrigEn ;Send 0011
            mov &Delay100us, R15 ;Wait 100us
            call #Delay

            call #TrigEn ;Send 0011
            mov &Delay100us, R15 ;Wait 100us
            call #Delay

            mov.b #00100000b, &P1OUT ;Send 0010
            call #TrigEn
            mov &Delay100us, R15 ;Wait 100us
            call #Delay

            ;LCD is now in 4-bit mode, which means we will send our commands nibble by nibble.

            mov.b #00100000b, &P1OUT ;Send 0010 1000
            call #TrigEn
            mov.b #10000000b, &P1OUT
            call #TrigEn

            mov &Delay100us, R15 ;Wait 53us+
            call #Delay

            mov.b #00000000b, &P1OUT ;Send 0000 1000
            call #TrigEn
            mov.b #10000000b, &P1OUT
            call #TrigEn

            mov &Delay100us, R15 ;Wait 53us+
            call #Delay

            mov.b #00000000b, &P1OUT ;Send 0000 0001
            call #TrigEn
            mov.b #00010000b, &P1OUT
            call #TrigEn

            mov &Delay4ms, R15 ;Wait 3ms+
            call #Delay

            mov.b #00000000b, &P1OUT ;Send 0000 0110
            call #TrigEn
            mov.b #01100000b, &P1OUT
            call #TrigEn
            mov &Delay100us, R15
            call #Delay

            ;initialization is over. Now we will start sending data to our LCD display






































Main	     clr R5
            mov.b #00001111b, R5
            call #SendCMD
            mov &Delay50us, R15
            call #Delay
            
            clr R4 ; 0 ise yukaridan asagi yaziyoruz, 1 ise asagidan yukariya. Bize bunu anlatan flag, R4'un 1. bit'inde tutuluyor. 
                   ; Bunun yeri degisebilir.
            
            clr R8 ; LCD'de noktayi koymak istedigimiz karenin sol kenara gore offset'i
                   ; Bunun da yeri degisebilir.
            
realLoop    clr R5
            mov.b #00000001b, R5
            call #SendCMD
            mov &Delay2ms, R15
            call #Delay


            call #Write
            
            mov &Delay100ms, R15
            call #Delay
            mov &Delay100ms, R15
            call #Delay
            mov &Delay100ms, R15
            call #Delay
            mov &Delay100ms, R15
            call #Delay
            mov &Delay100ms, R15
            call #Delay
            
            xor.b #00000001b, R4
            
            jmp realLoop


Write       mov #string, R7              ; R7 yazmak istedigimiz char array'in adresini tutuyor.

            cmp #16d, R8                 ; offset 16 ise 0'a reset'lenmesi gerekiyor., esit degilse her zamanki gibi devam.
            jne wherestart
            mov #0d, R8


wherestart  bit.b #00000001b, R4         ; 1. bit 0 ise yukaridan basla aksi halde asagidan basla
            jeq upper

lower       clr R5
            mov.b #11000000b, R5
            jmp send

upper       clr R5
            mov.b #10000000b, R5         ; Bu kisimda sorun cikabilir.
            jmp send

send        add R8, R5                   ;offset'i ekle adres'e, sonrasinda arttir.
            inc R8
            call #SendCMD
            mov &Delay50us, R15
            call #Delay

            jmp writeLoop



writeLoop   clr R6
            mov.b @R7+, R6

            cmp.b #00h, R6    ;String'in sonuna gelip gelmedigimizi kontrol ediyoruz.
            jeq endWrite

            call #SendData
            mov &Delay50us, R15
            call #Delay
            
            jmp writeLoop


   

endWrite    ret

























































TrigEn	bis.b #01000000b, &P2OUT
            bic.b #01000000b, &P2OUT
            ret

SendCMD	mov.b R5, &P1OUT
            call #TrigEn
            rla R5
            rla R5
            rla R5
            rla R5
            mov.b R5, &P1OUT
            call #TrigEn
            ret

SendData	bis.b #10000000b, &P2OUT
            mov.b R6, &P1OUT
            call #TrigEn
            rla R6
            rla R6
            rla R6
            rla R6
            mov.b R6, &P1OUT
            call #TrigEn
            bic.b #10000000b, &P2OUT
            ret

Delay		dec.w R15
            jnz Delay
            ret



		    .data
string      .byte "*",00h ;string to be written to the LCD

Delay50us	.word	011h
Delay100us	.word 	022h
Delay2ms	.word 	0250h
Delay4ms	.word 	0510h
Delay100ms	.word	07A10h


;-------------------------------------------------------------------------------
; Stack Pointer definition
;-------------------------------------------------------------------------------
            .global __STACK_END
            .sect   .stack

;-------------------------------------------------------------------------------
; Interrupt Vectors
;-------------------------------------------------------------------------------
            .sect   ".reset"                ; MSP430 RESET Vector
            .short  RESET
