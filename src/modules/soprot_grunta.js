
function getDateGrunt() {
    const formNagr = document.querySelector('.frm-nagruzka'),
        selectRegion = formNagr.querySelector('#region'),
        selectCity = formNagr.querySelector('#city'),
        selectGrunt = formNagr.querySelector('#grunt'),
        options = selectRegion.querySelectorAll('option');
    console.log(exampleJsonFile.GlubinaPromerz);

    function render() {
        exampleJsonFile.GlubinaPromerz.forEach(function (item, index) {
            const optionElement = document.createElement('option');
            // optionElement.classList.add('todo-item');
            optionElement.innerHTML = '<span class="text-todo">' + item.region + ' </span>' +
                '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
                '</div>';

            console.log(item.region);  
            selectRegion.append(optionElement);

            // if (item.completed) {
            //     todoCompleted.append(optionElement);
            // } else {
            //     todoList.append(optionElement);
            // }

        })

    }

    render();





    for (let i = 0; i < exampleJsonFile.GlubinaPromerz.length; i++) {
        // console.log(exampleJsonFile.GlubinaPromerz[i].region);
        let region = exampleJsonFile.GlubinaPromerz[i].region,
            city = exampleJsonFile.GlubinaPromerz[i].city;
        let clayAndLoam = exampleJsonFile.GlubinaPromerz[i].clayAndLoam.toFixed(2);
        let sandyLoam = exampleJsonFile.GlubinaPromerz[i].sandyLoam.toFixed(2);
        let sand = exampleJsonFile.GlubinaPromerz[i].sand.toFixed(2);
        let CoarseСlasticSoils = exampleJsonFile.GlubinaPromerz[i].CoarseСlasticSoils.toFixed(2);
    //    console.log(region);

        // if (region == 'Ненецкий АО (Архангельская область)') {
        //     console.log(region + ' ' + city + ':  Глина и суглинки, м: ' + clayAndLoam + ', Супеси, пылеватые и мелкие пески, м: ' + sandyLoam + ', Пески крупные гравелистые и средней крупности, м: ' + sand + ', Крупнообломочные грунты, м: ' + CoarseСlasticSoils);
        // }




    }


}
import exampleJsonFile from './data/glubinaPromerz.json' assert { type: "json" };

export default getDateGrunt;