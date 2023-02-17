// запуск расчетов
function runStart(){
    document.addEventListener('DOMContentLoaded', function () {
        'use strict';   

        if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("button-gidr").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0 && document.getElementsByClassName("frm-arm").length !== 0 && document.getElementsByClassName("frm-nagruzka").length !== 0){
            // alert("есть все");
            btnParam();
            btnOpalub();  
            btnTransh();
            btnGidroisol();
            btnArmatura();
            btnNagruzka();
            return;
        }  else if (document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0 && document.getElementsByClassName("frm-arm").length !== 0) {
            // alert("есть параметры, опалубка, траншея, армирование");           
            btnParam();
            btnOpalub();  
            btnTransh();         
        }  else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("button-gidr").length !== 0) {
            // alert("есть параметры и гидроизоляция");           
            btnParam();
            btnGidroisol();          
        } else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-opalubka").length !== 0) {
            // alert("есть параметры и опалубка");           
            btnParam();
            btnOpalub();            
        }  else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("form-transhei").length !== 0) {
            // alert("есть параметры и траншея");           
            btnParam();            
            btnTransh();
        } else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("frm-arm").length !== 0) {
            // alert("есть параметры и армирование");           
            btnParam();  
            btnArmatura(); 
        } else if(document.getElementsByClassName("frm-inp").length !== 0 && document.getElementsByClassName("frm-nagruzka").length !== 0) {
            // alert("есть параметры и армирование");           
            btnParam();  
            btnNagruzka();
        } 
         else if(document.getElementsByClassName("frm-inp").length !== 0) {
            // alert("есть только параметры");           
            btnParam();            
        } else {
            // alert("нет калькуляторов");
            return;
        }
    });
};

import { btnParam, btnGidroisol, btnOpalub, btnTransh, btnArmatura, btnNagruzka}  from './addEvent.js'



export default runStart;