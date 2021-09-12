let table = document.querySelector('.table')
let url = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json'
let thead = document.querySelector('.thead')
let theadtr = document.querySelector('.theadtr')
let tbody = document.querySelector('.tbody')
let desc = document.querySelector('.description')
let descriptions = []
let searchByName = document.querySelector('.search')
let state = document.querySelector('.state')
let stateItem = document.state.item.selectedIndex;
let pagesButtums = document.querySelector('.page-number')






async function getData(){
    let response = await fetch(url); 
    let result = await response.json(); 
    results = await result     
    createtable(results)
    
}

 

 

function createtable(results){
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
    search(results)
    filterByState(results)
    CreatePageButtums(results)
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
    CreatePageButtums(arr)
}

function sortedreverse(arr, x){
    if(x == 'state'){
        arr.sort((a, b) => b.adress.state > a.adress.state ? 1 : -1);  
    }
    arr.sort((a, b) => b[x] > a[x] ? 1 : -1);    
    createTBody(arr)
    createDescriptions(arr)
    descListener()
    CreatePageButtums(arr)
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
    let th = document.querySelectorAll('.th')
    th.forEach(th => th.addEventListener('click', (e) => {        
        if(e.target.classList.contains('th')) {
            th.classList.remove('th')
            th.classList.add('thReverse')
            sortedreverse(arr, th.innerHTML)            
        } else {
            th.classList.remove('thReverse')
            th.classList.add('th')
            sorted(arr, th.innerHTML)
        }}))
}

function search(){
searchByName.onchange = function(){    
    let substr = searchByName.value.toUpperCase()
    let arr = []
    if(substr == '' || substr == null || substr == undefined){
        let arr = results
        createtable(arr)
    }else{
        for(let i = 0; i < results.length; i++){
            let name = results[i].firstName.toUpperCase()
            if(name.includes(substr)){
                arr.push(results[i])
            }
        }
        createtable(arr)
    }    
    } 
}

function filterByState(x){
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
            createtable(arr)

            
        }else{
            for(let i = 0; i < results.length; i++){
                if(results[i].adress.state == state.value){
                    arr.push(results[i])
                }
            }
            createtable(arr)
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
     let buttoms = document.querySelectorAll('button')
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
     buttoms.forEach(buttoms => buttoms.addEventListener('click', (e) => { 
        
        if(e.target.classList.contains('button')){
            let buttoms = document.querySelectorAll('button')       
        buttoms.forEach(buttoms => buttoms.classList.remove('ButActive'))
            e.target.classList.add('ButActive')
        }else{
            if(e.target.id == 'Prev'){
                let buttoms = document.querySelectorAll('button')
                if(buttoms.length > 3){
                let activeBut = document.querySelector('.ButActive')
                let index = activeBut.id
                let prevIndex = index -1
                if(index > 1){
                    activeBut.classList.remove('ButActive')
                    let prevBut = document.querySelector(`.B${prevIndex}`)
                    prevBut.classList.add('ButActive')
                    }
                }    
            }else{
                if(e.target.id == 'Next'){
                    let buttoms = document.querySelectorAll('button')
                    if(buttoms.length > 3){
                    
                    let activeBut = document.querySelector('.ButActive')
                    let index = activeBut.id
                    let nextIndex = +index +1
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
        
        }))
     

    
}
getData()