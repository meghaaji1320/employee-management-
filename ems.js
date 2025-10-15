let search=document.getElementById('search')
let form=document.getElementById('form')
let name=document.getElementById('name')
let job=document.getElementById('job')
let salary=document.getElementById('salary')
let table=document.getElementById('table')
let jobcategory=document.getElementById('jobcategory')
let editmode = false;
let editindex = -1

let employee =JSON.parse(localStorage.getItem('employees')) || []
let filteredemployees = [...employee]
function edit(id){
    if(editmode){
      return cancel()  
    }
    editmode = true;
    editindex = id;
    let findemp = employee.find(x =>x.id == id);
    if(findemp){
    name.value = findemp.name
    job.value = findemp.job
    salary.value = findemp.salary
    }
    render()
    
}

function selectCategory(){
    if(jobcategory.value == 'All'){
        filteredemployees = [...employee]
        render()
        return 
    }
    filteredemployees = employee.filter((x) => {
        return x.job.toLowerCase() == jobcategory.value
    })
    render()
}

function searchemployee(){
    filteredemployees = employee.filter((emp)=> {
        return emp.name.toLowerCase().includes(search.value.toLowerCase())||emp.job.includes(search.value)||emp.salary.includes(search.value)
    })
    
    render()
}

function cancel(id){
    editmode = false;
    editindex = -1;
   clearInput()
    render()
}
function updatestorage(){
    localStorage.setItem('employees',JSON.stringify(employee))
    filteredemployees = [...employee]
    
}


function deleteItem(id){
    let okaytodelete = confirm('Are you sure to delete')
    if(!okaytodelete){
        return
    }
    let emp = employee.find((x) => x.id == id)
    let index = employee.indexOf(emp)
    employee.splice(index,1)
    updatestorage()
    render()

}

function render(){
    table.innerHTML=`
     <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Salary</th>
        <th>Actions</th>
      </tr>
    `
    
    filteredemployees.forEach((emp) => {
        table.innerHTML += `
             <tr>
            <td>${emp.name}</td>
            <td>${emp.job}</td>
            <td>${emp.salary}</td>
            <td>
            <button onclick="edit(${emp.id})">${editindex == emp.id ? 'cancel' : 'edit' }</button>
            <button onclick="deleteItem(${emp.id})">delete</button>
            </td>
           </tr>
        `
    });
    
}

function add(e){
    e.preventDefault()
if(name.value==''||job.value==''||salary.value==''){
    return alert('fill all fields')
}


    if (editmode){
        let emp = employee.find(x => x.id === editindex)
        emp.name = name.value
        emp.job = job.value
        emp.salary = salary.value
        editmode = false
        editindex = -1
    }else{
            let newemployee={
        id:Date.now(),
        name:name.value,
        job:job.value,
        salary:salary.value
    }
    employee.push(newemployee)
    }




    
    console.log(employee)
    clearInput()
    updatestorage()
    render()
}
function clearInput(){
    name.value=''
    job.value=''
    salary.value=''
}


search.addEventListener('input',()=>{
    searchemployee()
})


jobcategory.addEventListener('change',() => {
    selectCategory()
})

form.addEventListener('submit',add)
render()



