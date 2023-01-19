
const form = document.querySelector('.frm-inp');
const inputs =  form.querySelectorAll('input');
const totalPriceBtn =  form.querySelector('.button');
const typeFundamenta =  form.querySelectorAll('input[name="fundament-type"]');
const typeFundamentaLent =  form.querySelectorAll('input[name="type_fund[]"]');
const typeFundamentaSV =  form.querySelectorAll('input[name="type_fund_sv[]"]');
const materialType =  form.querySelectorAll('input[name="material-type"]');
const typeSV =  form.querySelectorAll('input[name="sv-type"]');
const options =  form.querySelectorAll('option');
const select = form.querySelector('#sum');

const areaElement = form.querySelector('#area');
const totalConsumptionElement = form.querySelector('#price');
const quantityElement = form.querySelector('#quantity');
const label = form.querySelectorAll('label');
console.log(select);

 // получение новых массивов с вводными данными
function getDateNw(){    
    let arrInputs = [];     
    let arrInputsImg = [];
    const arrNew = [arrInputs, arrInputsImg];
    
    for (let i = 0; i < inputs.length; i++) {
        // в случае отсутсвия значения брать данные из placeholder
        if ((inputs[i].value !== undefined || inputs[i].value !== null) && inputs[i].value === "" ){
            inputs[i].value = inputs[i].getAttribute("placeholder");                 
          }
        // проверка на минимум    
        if(inputs[i].name!="container-consumption" && (+inputs[i].min && +inputs[i].value < +inputs[i].min)){            
            const labelText = label[i].innerText.slice(0, -1);            
            alert(labelText + "- значение  меньше минимального (min = " + inputs[i].min + ")");     
            areaElement.innerText =  '';          
            totalConsumptionElement.innerText =  '';    
            return;
        }  
        // пропускать значение NaN  и передать переменные в массивы с числами и строками отдельно
        if(!isNaN(inputs[i].value)){
            inputs[i].setAttribute("step", 0.01);   
            arrInputs.push(+inputs[i].value);   
            } else{
                arrInputsImg.push(inputs[i].value);   
            }        
        }

    return(arrNew);
}

// калькулятор
function calculateNw(){    
    // присвоение данных параметрам
    const value = getDateNw();    
    // console.log(value);
    const A = value[0][3];
    const B = value[0][4];
    const C = value[0][5];
    const D = value[0][6];
    const E = value[0][7];
    const Asv = value[0][11];
    const Bsv = value[0][12];
    const r= value[0][13];
    const h = value[0][14];
    // валидация данных   
    if (D>A || D>B){     
        alert("D не корректно");
        areaElement.innerText =  '';          
        totalConsumptionElement.innerText =  '';   
        return; 
    } else {   
        calcConsumption();
    } 
    // формулы 
    function paymentTop(){        
        //  расчет переменных для стандарных (топ и внеш.) 
        function getStandartS(a,b,c){
            const S1 = (a + b) * 2 * c; // не меняется
            const S2 = a*b;      
            const S3 = S1 + S2; 
            let obj = {pVneshBP: S1, Top: S2, SumS: S3};            
            return obj;
        }
        // плиточный фундамент
        const objPl = getStandartS(A,B,C);              
        const areaPl = objPl.SumS; 

        //ленточный и свайный тип (заготовка)       
        const pVnutBP = (A-D*2 + B-D*2) * 2 * C;    
        let pTop = (A-D*2 + B) * 2 * D;
        const per1 = ((A-D*2)*C)*2;
        const per2 = E*C*2;   
        const decrease =  D*C*2;          
        // первый тип
        let area = objPl.pVneshBP+pVnutBP+pTop;
        // второй тип       
        const pTop2 = pTop+(A-D*2)*D; 
        let pVnutBP2 =pVnutBP+per1-decrease; 
        let area2 = objPl.pVneshBP+pVnutBP2+pTop2;
        // третий тип
        const pTop3 = pTop2+(E*D);   
        const decrease3 = decrease*2;                            
        let pVnutBP3 = pVnutBP+per1+per2-decrease3;  
        let area3 = objPl.pVneshBP+pVnutBP3+pTop3;  
        // четвертый тип     
        const pTop4 = pTop2+(E*D*2);
        const decrease4 =  decrease*3;
        const per2_4 = per2*2;
        let pVnutBP4 = pVnutBP+per1+per2_4-decrease4; 
        let area4 = objPl.pVneshBP+pVnutBP4+pTop4;         

        // сваи 
        // жби
        const objSv = getStandartS(Asv,Bsv,h);              
        let areaSv = objSv.SumS;        
        // винтовые
        const svCilindr=2*Math.PI*r*(h+r);        

        let arrArea = [areaPl, area, area2, area3, area4, areaSv, +svCilindr.toFixed(2)];
        return arrArea;   
    }
    // расчет площади плитного фундамента по умолчанию 
    function areaPlitFund(){           
        arrArea = paymentTop(); 
        area = arrArea[0]; 
    } 
    // расчет площади ленточного фундамента
    function areaLentFund(){
        arrArea = paymentTop(); 
        for(let radio of typeFundamentaLent){ 
            if(radio.checked) {   
                switch (radio.value) {    
                    // первый тип    
                    case value[1][0]:
                     area = arrArea[1];                                                                                
                    break;
                    // второй тип    
                    case value[1][1]:
                        area = arrArea[2];                                                                                
                        break;
                    case value[1][2]: 
                     // третий тип                                   
                     area = arrArea[3];                             
                        break;
                    case value[1][3]:
                    // четвертый тип     
                    area = arrArea[4];                          
                    break;                            
                }              
                return(area);                 
            } 
        }  
    }
    // расчет площади свайного фундамента 
    function areaSvFund(){
        arrArea = paymentTop();    
       
        for(let radio of typeSV){ 
            if(radio.checked && radio.value === "15") {  
                areaSv = arrArea[5];              
              
             } else if(radio.checked && radio.value === "16"){
                areaSv = arrArea[6];             
             }          
        }
      
        console.log(areaSv);
        
        let number = value[0][15];
        areaSv *=  number;       
        
        for(let radio of typeFundamentaSV){ 
            if(radio.checked) {   
                switch (radio.value) {    
                    // первый тип    
                    case value[1][4]:
                     area = arrArea[1] + areaSv;                                                                              
                    break;
                    // второй тип    
                    case value[1][5]:
                        area = arrArea[2] * areaSv;                                                                                
                        break;
                    case value[1][6]: 
                     // третий тип                                   
                     area = arrArea[3] * areaSv;                           
                        break;
                    case value[1][7]:
                    // четвертый тип     
                    area = arrArea[4] * areaSv;                        
                    break;                            
                }              
                return(area);                 
            } 
        }
    }

    // выбор расчета площади по типу фундамента
    function getCalcTypeFund(){  
        for(let radio of typeFundamenta){ 
             // расчет плитного фундамента по умолчанию 
            if(radio.checked && radio.value === "2") {
                areaPlitFund();
            }
             // расчет ленточного фундамента 
            else if (radio.checked && radio.value === "3"){    
                areaLentFund();     
            }
            // расчет свайного фундамента 
            else if (radio.checked && radio.value === "4") {                   
                areaSvFund();
            }           
        }  
        return(area);       
    }   




    // расчет расхода гидроизоляции
    function calcConsumption(){           
        area = getCalcTypeFund();
        const coefficient = 1.1;
        let consumption= value[0][18]*coefficient; 
        let totalConsumption= area * consumption; 

        // передача расчета в текст      
        const formatterInt = new Intl.NumberFormat('ru-RU');   
        areaElement.innerText =  formatterInt.format(area) + ' м2';  
        // const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });   
        // const formatter = new Intl.NumberFormat('ru-RU');     
        for(let radio of materialType){
            let name = 'Количество банок ';
            let quantity= value[0][19]; 
            let widthRul = value[0][20];
            let lengthRul = value[0][21];
            if (radio.checked && radio.value === "8"){
                totalConsumptionElement.innerText =  formatterInt.format(totalConsumption) + ' кг';   
                if(quantity){
                    let quantityKg = totalConsumption/quantity;
                    quantityElement.innerText = name + formatterInt.format(quantityKg) + ' шт';   
                   
                } else{
                    quantityElement.innerText =  ' ';   
                }
            } else if (radio.checked && radio.value === "9"){
                name = ' рул. ';    
                Srul =  widthRul*lengthRul;           
                let quantityRul = area/Srul;
                totalConsumptionElement.innerText = formatterInt.format(quantityRul) + name;
                quantityElement.innerText =  ' ';

            }
        }
    } 
}

// выбор по площади
function getOptionTab(){
    for(let radio of options){ 
        // расчет плитного фундамента по умолчанию 
        if(radio.checked && radio.outerText === options[0].outerText) {
            area = getCalcTypeFund();
          
        }
        // расчет ленточного фундамента 
        else if (radio.checked && radio.value === options[1].outerText){    
        console.log(options[1].outerText);
        }
        // расчет свайного фундамента 
        else if (radio.checked && radio.value === options[2].outerText) {                   
        console.log(options[2].outerText);
        }           
    }  
    console.log(area);
    return(area);  
}
  

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    // запуск функции сразу при загрузке страницы
    // calculateNw();
    // запуск функции сразу при изменение значений input
    for(const option of options) {      
        select.addEventListener('change', (e) =>{   
            // for (option of options)
            if(e.target.value == options[1].value){
                console.log(options[1].outerText + " :значение " +  + e.target.value);
            } else if (e.target.value == options[2].value){
                console.log(options[2].outerText + " :значение " + e.target.value);  
            } else if (e.target.value == options[3].value){
                console.log(options[3].outerText + " :значение " + e.target.value);  
            } else if (e.target.value == options[4].value){
                console.log(options[4].outerText + " :значение " + e.target.value);  
            } else {
                console.log(options[0].outerText + " :значение " + e.target.value);
            }            
       })   
    }

    for(const input of inputs) {      
        input.addEventListener('input', () =>{         
            calculateNw();           
       })   
    }
    // запуск функции сразу при клике по кнопке
    totalPriceBtn.addEventListener('click', function (e) {calculateNw()});   
});


