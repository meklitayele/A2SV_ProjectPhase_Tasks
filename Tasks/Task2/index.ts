
const inputBox = document.getElementById("taskEntry") as HTMLInputElement;
const listItems = document.getElementById("dataList") as HTMLUListElement;
const addItems = document.getElementById("addBtn") as HTMLButtonElement;


function addTask(): void {
  if (inputBox.value === '') {
    alert('Write In the Input Field to Add a Task');
    console.log('Write In the Input Field to Add a Task');
  } else {
    const li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listItems.appendChild(li);

    const span = document.createElement('span');
    span.innerHTML = '\u00d7'; //u00d7 = 'x
    li.appendChild(span);
  }

  inputBox.value = '';
}


addItems.addEventListener('click', addTask);


inputBox.addEventListener('keydown', (e: KeyboardEvent): void => {
  console.log('Key pressed:', e.key);
  if (e.key === 'Enter') {
    addTask();
  }
});


listItems.addEventListener('click', (e: MouseEvent): void => {
  const target = e.target as HTMLElement;

  if (target.tagName === 'LI') {
    target.classList.toggle('checked');
  } else if (target.tagName === 'SPAN') {
    target.parentElement?.remove();
  }
}, false);
