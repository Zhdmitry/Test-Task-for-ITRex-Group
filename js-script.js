let table = document.querySelector('.table')
let url = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json'
let thead = document.querySelector('.thead')
let theadtr = document.querySelector('.theadtr')
let tbody = document.querySelector('.tbody')
let desc = document.querySelector('.description')
let descriptions = []
let searchByName = document.querySelector('.search')
let state = document.querySelector('.state')

let pagesButtums = document.querySelector('.page-number')
let th = document.querySelectorAll('.th')





async function getData(){
    let response = await fetch(url); 
    let result = await response.json(); 
    results1 = await result     
    createtable(results1)
    
}

 

 

function createtable(results){
    searchByName.value = ''
    
    theadtr.innerHTML =''
    for(let key in results[0]){
        if(key == 'adress' ){
            for(let keys in results[0][key]){
                if(keys == 'state')
                theadtr.innerHTML = theadtr.innerHTML + `<th class = "th">${keys}</th>` 
            }     
        }else{
            if(key != 'description') theadtr.innerHTML = theadtr.innerHTML + `<th class = "th">${key}</th>`
        }
    }        
    createTBody (results)
    createDescriptions(results)
    descListener()
    sortListener(results)
    
    
    CreatePageButtums(results)
    PagesListener(results)
    let state = document.querySelector('.state')
    let states = []
    for(let i = 0; i < results1.length; i++){
        states.push(results1[i].adress.state)
    }
    states = Array.from(new Set(states))
    state.innerHTML = `<option value="0" >Filter by state</option>` + `<option value="1">All STATES</option>`
    for(let i = 0; i<states.length; i++){
        state.innerHTML = state.innerHTML + `<option value="${states[i]}">${states[i]}</option>`
    }
    
}




function createTBody (x){
        tbody.innerHTML=''
        for(let i = 0; i< x.length; i++){
        tbody.innerHTML = tbody.innerHTML + `<tr class = "trow trow${i}" id ="${i}"></tr>`
        let trow = document.querySelector(`.trow${i}`)    
        for(let key in x[i]){
            if(key == 'adress'){
                trow.innerHTML = trow.innerHTML + `<td>${x[i][key].state}</td>`
            }else{
                if(key != 'description') trow.innerHTML = trow.innerHTML + `<td class ='${key}'>${x[i][key]}</td>`
            }
        }
    }
}


function sorted(arr, x){
    if(x == 'state'){
        arr.sort((a, b) => a.adress.state > b.adress.state ? 1 : -1);  
    }
    arr.sort((a, b) => a[x] > b[x] ? 1 : -1);
    createTBody(arr)
    createDescriptions(arr)
    descListener()
    PagesListener(arr)
}

function sortedreverse(arr, x){
    if(x == 'state'){
        arr.sort((a, b) => b.adress.state > a.adress.state ? 1 : -1);  
    }
    arr.sort((a, b) => b[x] > a[x] ? 1 : -1);    
    createTBody(arr)
    createDescriptions(arr)
    descListener()
    PagesListener(arr)
}



function createDescriptions( arr){
    descriptions.splice(0, descriptions.length)
    for(let i = 0; i <arr.length; i++){
        let person = `Selected profile: ${arr[i].firstName} ${arr[i].lastName}`
        let desc = `Description: ${arr[i].description}`
        let streetadress = `Address: ${arr[i].adress.streetAddress}`
        let city = `City: ${arr[i].adress.city}`
        let state = `State: ${arr[i].adress.state}`
        let index = `Index: ${arr[i].adress.zip}`
        descriptions.push(`<p>Profile info:</p> <p>${person}</p> <p>${desc}</p> <p>${streetadress}</p> <p>${city}</p> <p>${state}</p> <p>${index}</p>`)
    }
}

function descListener(){
    let trows = document.querySelectorAll('.trow')    
    trows.forEach(trows => trows.addEventListener('click', (e) => {
        desc.style = 'display: block'
        let trows = document.querySelectorAll('.trow')
        trows.forEach(trows => trows.classList.remove('active'))
        let pos = e.target.parentNode.id
        desc.innerHTML = `${descriptions[pos]}`
        e.target.parentNode.classList.add('active')
        }))
    }



    
function sortListener(arr){
    let z = document.querySelector('.theadtr')
        z.innerHTML = z.innerHTML
    let th = document.querySelectorAll('.th')

    function ff(e){
        
        if(e.target.classList.contains('th')){
            e.target.classList.remove('th')
            e.target.classList.add('thReverse')
            sortedreverse(arr, e.target.innerHTML)
        }else{
            e.target.classList.remove('thReverse')
            e.target.classList.add('th')
            sorted(arr, e.target.innerHTML)
        }
    }
    
    th.forEach(th => th.addEventListener('click', ff))
}




function search(results){
     
searchByName.onchange = function(){    
    let substr = searchByName.value.toUpperCase()
    let arr = []
    if(substr == '' || substr == null || substr == undefined){
        let arr = results
        createTBody (arr)
    createDescriptions(arr)
    descListener()
    sortListener(arr)
    

    CreatePageButtums(arr)
    PagesListener(arr)
    }else{
        for(let i = 0; i < results.length; i++){
            let name = results[i].firstName.toUpperCase()
            if(name.includes(substr)){
                arr.push(results[i])
            }
        }
    createTBody (arr)
    createDescriptions(arr)
    descListener()
    sortListener(arr)
    

    CreatePageButtums(arr)
    PagesListener(arr)
    }    
    } 
}



function CreatePageButtums(results){
    let valueofPages  = Math.ceil(results.length/20)
    pagesButtums.innerHTML = ''
    for(let i = 1; i<=valueofPages; i++){
        if(i == 1){
            pagesButtums.innerHTML = pagesButtums.innerHTML + `<button class="button ButActive B${i}" id="${i}" >${i}</button>`

        }else{
            pagesButtums.innerHTML = pagesButtums.innerHTML + `<button class="button B${i}" id="${i}">${i}</button>`
        }        
    }
    let collection = document.querySelectorAll('.trow')
     
     let activeBut = document.querySelector('.ButActive')
        let index = activeBut.id
        let firstIndex = index*20-20
        let lastIndex = index*20
        collection.forEach(col => col.style = 'display: none')
        for(let i = 0; i < collection.length; i++){             
            if(i >= firstIndex && i< lastIndex){
                collection[i].style = 'display: table-row'

            }
        }  
        
    }

    function PagesListener(results) {
        
        let valueofPages  = Math.ceil(results.length/20)
    pagesButtums.innerHTML = ''
    for(let i = 1; i<=valueofPages; i++){
        if(i == 1){
            pagesButtums.innerHTML = pagesButtums.innerHTML + `<button class="button ButActive B${i}" id="${i}" >${i}</button>`

        }else{
            pagesButtums.innerHTML = pagesButtums.innerHTML + `<button class="button B${i}" id="${i}">${i}</button>`
        }        
    }
    let collection = document.querySelectorAll('.trow')
     
     let activeBut = document.querySelector('.ButActive')
        let index = activeBut.id
        let firstIndex = index*20-20
        let lastIndex = index*20
        collection.forEach(col => col.style = 'display: none')
        for(let i = 0; i < collection.length; i++){             
            if(i >= firstIndex && i< lastIndex){
                collection[i].style = 'display: table-row'

            }
        }  
        let buttoms = document.querySelectorAll('button')
     buttoms.forEach(buttoms => buttoms.addEventListener('click', Listener ))
    }
        
     
    function Listener(e) { 
        let collection = document.querySelectorAll('.trow')
        let valueofPages  = Math.ceil(collection.length/20)
        if(e.target.classList.contains('button')){
            let buttoms = document.querySelectorAll('button')       
        buttoms.forEach(buttoms => buttoms.classList.remove('ButActive'))
            e.target.classList.add('ButActive')
        }else{
            if(e.target.id == 'Prev'){
                let buttoms = document.querySelectorAll('button')
                if(buttoms.length > 4){
                let activeBut = document.querySelector('.ButActive')
                let index = activeBut.id
                let prevIndex = index*1 -1
                console.log(1)
                if(index > 1){
                    activeBut.classList.remove('ButActive')
                    let prevBut = document.querySelector(`.B${prevIndex}`)
                    prevBut.classList.add('ButActive')
                    }
                }    
            }else{
                if(e.target.id == 'Next'){
                    let buttoms = document.querySelectorAll('button')
                    console.log(buttoms.length)
                    if(buttoms.length > 4){
                    
                    let activeBut = document.querySelector('.ButActive')
                    let index = activeBut.id
                    let nextIndex = index*1 +1
                    if(index <  valueofPages){
                        activeBut.classList.remove('ButActive')
                        let nextBut = document.querySelector(`.B${nextIndex}`)
                        nextBut.classList.add('ButActive')
                        }
                    }    
                } 
            }
        }

        let activeBut = document.querySelector('.ButActive')
        let index = activeBut.id
        let firstIndex = index*20-20
        let lastIndex = index*20
        collection.forEach(col => col.style = 'display: none')
        for(let i = 0; i < collection.length; i++){
             
            if(i >= firstIndex && i< lastIndex){
                collection[i].style = 'display: table-row'

            }
        }
        
        }

    function search111(){
        let substr = searchByName.value.toUpperCase()
        console.log(substr)
        let stateItem = document.state.item.selectedIndex;
        if(substr == '' && (stateItem == 0 || stateItem == 1)){
            let state = document.querySelector('.state')
            let states = []
            for(let i = 0; i < results1.length; i++){
                states.push(results1[i].adress.state)
            }
            states = Array.from(new Set(states))
            state.innerHTML = `<option value="0" >Filter by state</option>` + `<option value="1">All STATES</option>`
            for(let i = 0; i<states.length; i++){
                state.innerHTML = state.innerHTML + `<option value="${states[i]}">${states[i]}</option>`
            }            
            createTBody (results1)
            createDescriptions(results1)
            descListener()            
            sortListener(results1)            
            CreatePageButtums(results1)
            PagesListener(results1)
        }
        if(substr == '' && (stateItem !== 0 && stateItem !== 1)){
            let arr = []
            for(let i = 0; i < results1.length; i++){
                if(results1[i].adress.state == state.value){
                    arr.push(results1[i])
                }
            }
            createTBody (arr)
            createDescriptions(arr)
            descListener()    
            sortListener(arr)    
            CreatePageButtums(arr)
            PagesListener(arr)
        }

        if(substr !== '' && (stateItem !== 0 && stateItem !== 1)){
            let arr = []
            let arr1 = []
            for(let i = 0; i < results1.length; i++){
                if(results1[i].adress.state == state.value){
                    arr.push(results1[i])
                }
            }
            for(let i = 0; i < arr.length; i++){
                let name = arr[i].firstName.toUpperCase()
                if(name.includes(substr)){
                    arr1.push(arr[i])
                }
            }

            

            
            createTBody (arr1)
            createDescriptions(arr1)
            descListener()    
            sortListener(arr1)    
            CreatePageButtums(arr1)
            PagesListener(arr1)
        }

        if(substr !== '' && (stateItem == 0 || stateItem == 1)){
            let arr = []
            for(let i = 0; i < results1.length; i++){
                let name = results1[i].firstName.toUpperCase()
                if(name.includes(substr)){
                    arr.push(results1[i])
                }
            }
            
            let state = document.querySelector('.state')
            let states = []
            for(let i = 0; i < arr.length; i++){
                states.push(arr[i].adress.state)
            }
            states = Array.from(new Set(states))
            state.innerHTML = `<option value="0" >Filter by state</option>` + `<option value="1">All STATES</option>`
            for(let i = 0; i<states.length; i++){
                state.innerHTML = state.innerHTML + `<option value="${states[i]}">${states[i]}</option>`
            }

            createTBody (arr)
            createDescriptions(arr)
            descListener()            
            sortListener(arr)            
            CreatePageButtums(arr)
            PagesListener(arr)
        }




        



    
    }
    
/*function filterByState(results){
    let state = document.querySelector('.state')
    let states = []
    for(let i = 0; i < results.length; i++){
        states.push(results[i].adress.state)
    }
    states = Array.from(new Set(states))
    state.innerHTML = `<option value="0" >Filter by state</option>` + `<option value="1">All STATES</option>`
    for(let i = 0; i<states.length; i++){
        state.innerHTML = state.innerHTML + `<option value="${states[i]}">${states[i]}</option>`
    }

    
    state.onchange = function(){
        let arr = []
        let stateItem = document.state.item.selectedIndex;
        if( stateItem == 1 ){
            let arr = results
            createTBody (arr)
    createDescriptions(arr)
    descListener()
    sortListener(arr)
    
    
    CreatePageButtums(arr)
    PagesListener(arr)

            
        }else{
            for(let i = 0; i < results.length; i++){
                if(results[i].adress.state == state.value){
                    arr.push(results[i])
                }
            }
            createTBody (arr)
    createDescriptions(arr)
    descListener()
    sortListener(arr)
    
    
    CreatePageButtums(arr)
    PagesListener(arr)
        }    
    }    
}
*/
getData()