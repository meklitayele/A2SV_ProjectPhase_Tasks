"use strict";

const inputBox = document.getElementById("taskEntry");
const listItems = document.getElementById("dataList");
const addItems = document.getElementById("addBtn");

function addTask() {
    if (inputBox.value === '') {
        alert('Write In the Input Field to Add a Task');
        console.log('Write In the Input Field to Add a Task');
    }
    else {
        const li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listItems.appendChild(li);
        const span = document.createElement('span');
        span.innerHTML = '\u00d7'; // Unicode for "×"
        li.appendChild(span);
    }
    inputBox.value = '';
}

addItems.addEventListener('click', addTask);

inputBox.addEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key);
    if (e.key === 'Enter') {
        addTask();
    }
});
listItems.addEventListener('click', (e) => {
    var _a;
    const target = e.target;
    if (target.tagName === 'LI') {
        target.classList.toggle('checked');
    }
    else if (target.tagName === 'SPAN') {
        (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    }
}, false);

//npx tsc this is going to create a js file for me 