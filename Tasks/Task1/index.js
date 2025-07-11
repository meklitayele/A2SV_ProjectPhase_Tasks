const inputBox = document.getElementById("taskEntry")
const listItems = document.getElementById("dataList")
const addItems = document.getElementById("addBtn")

function addTask(){
  if (inputBox.value === ''){
    alert('Write In the Input Field to Add a Task')
    console.log('Write In the Input Field to Add a Task')
  }
  else{
    let li = document.createElement('li')
    li.innerHTML = inputBox.value
    listItems.appendChild(li)
    let span = document.createElement('span')
    span.innerHTML = '\u00d7'
    li.appendChild(span)
  }
  inputBox.value = ''
  
}

addItems.addEventListener('click',addTask)
inputBox.addEventListener('keydown',function(e){
  console.log('Key pressed:', e.key); 
  if(e.key === 'Enter'){
    addTask()
  }

})


listItems.addEventListener('click',function(e){
  if(e.target.tagName === 'LI'){
    e.target.classList.toggle('checked')
  }
  else if(e.target.tagName === 'SPAN'){
    e.target.parentElement.remove()
  }

},false)
