import App from './app.scss';
import { app, todo as todoitem, indexOfObject } from './app';


let undoMemory = [];
let currentParentElement = 0;

const progress = document.getElementById('progress');
const todo = document.getElementById('todo');
const completed = document.getElementById('completed');
const form = document.getElementById('form');
const undoButton = document.getElementById('undo');
const todoText = document.getElementById('todoText');
const progressText = document.getElementById('progressText');
const completedText = document.getElementById('completedText');
const totalTask = document.getElementById('totalTask');

undoButton.addEventListener('click', e => {
  e.preventDefault();
  if (undoMemory.length !== 0) {
    undoFunction();
  }
});

form.addEventListener('submit', e => {
  const msg = document.getElementById('taskName').value;
  e.preventDefault();
  addTodo(msg);
});


const render = () => {
  while (todo.hasChildNodes()) {
    todo.removeChild(todo.lastChild);
  }
  while (completed.hasChildNodes()) {
    completed.removeChild(completed.lastChild);
  }
  while (progress.hasChildNodes()) {
    progress.removeChild(progress.lastChild);
  }
  app.todo.forEach(item => {
    const node = document.createElement('LI');
    node.setAttribute('draggable', true);
    node.setAttribute('id', item);
    node.setAttribute('data-parentid', '1');
    node.setAttribute('data-id', item.toString());
    node.setAttribute('draggable', true);
    const span = document.createElement('SPAN');
    const button = document.createElement('BUTTON');
    button.setAttribute('class', 'btn');
    const indexInArray = indexOfObject(app.items, item, 'id');
    const textnode = document.createTextNode(app.items[indexInArray].name);
    const closenode = document.createTextNode('X');
    button.appendChild(closenode);
    button.onclick = () => {
      undoMemory.push({ item, parentId: 1, name: app.items[indexInArray].name });
      const indexOfItem = indexOfObject(app.items, item, 'id');
      const index = app.todo.indexOf(item);
      app.items = [...app.items.slice(0, indexOfItem), ...app.items.slice(indexOfItem + 1)];
      app.todo = [...app.todo.slice(0, index), ...app.todo.slice(index + 1)];
      render();
    };
    span.appendChild(textnode);
    node.appendChild(span);
    node.appendChild(button);
    node.ondragstart = e => {
      e.dataTransfer.setData('parentId', Number(e.currentTarget.dataset.parentid));
      e.dataTransfer.setData('id', Number(e.currentTarget.dataset.id));
    };
    todo.appendChild(node);
  });


  app.progress.forEach(item => {
    const node = document.createElement('LI');
    node.setAttribute('draggable', true);
    node.setAttribute('id', item);
    node.setAttribute('data-parentid', '2');
    node.setAttribute('data-id', item.toString());
    node.setAttribute('draggable', true);
    const span = document.createElement('SPAN');
    const button = document.createElement('BUTTON');
    button.setAttribute('class', 'btn');
    const indexInArray = indexOfObject(app.items, item, 'id');
    const textnode = document.createTextNode(app.items[indexInArray].name);
    const closenode = document.createTextNode('X');
    button.appendChild(closenode);
    button.onclick = () => {
      undoMemory.push({ item, parentId: 2, name: app.items[indexInArray].name });
      const indexOfItem = indexOfObject(app.items, item, 'id');
      const index = app.progress.indexOf(item);
      app.items = [...app.items.slice(0, indexOfItem), ...app.items.slice(indexOfItem + 1)];
      app.progress = [...app.progress.slice(0, index), ...app.progress.slice(index + 1)];
      render();
    };
    span.appendChild(textnode);
    node.appendChild(span);
    node.appendChild(button);
    node.ondragstart = e => {
      e.dataTransfer.setData('parentId', Number(e.currentTarget.dataset.parentid));
      e.dataTransfer.setData('id', Number(e.currentTarget.dataset.id));
    };
    progress.appendChild(node);
  });


  app.completed.forEach(item => {
    const node = document.createElement('LI');
    node.setAttribute('draggable', true);
    node.setAttribute('id', item);
    node.setAttribute('data-parentid', '3');
    node.setAttribute('data-id', item.toString());
    node.setAttribute('draggable', true);
    const span = document.createElement('SPAN');
    const button = document.createElement('BUTTON');
    button.setAttribute('class', 'btn');
    const indexInArray = indexOfObject(app.items, item, 'id');
    const textnode = document.createTextNode(app.items[indexInArray].name);
    const closenode = document.createTextNode('X');
    button.appendChild(closenode);
    button.onclick = () => {
      undoMemory.push({ item, parentId: 3, name: app.items[indexInArray].name });
      const indexOfItem = indexOfObject(app.items, item, 'id');
      const index = app.completed.indexOf(item);
      app.items = [...app.items.slice(0, indexOfItem), ...app.items.slice(indexOfItem + 1)];
      app.completed = [...app.completed.slice(0, index), ...app.completed.slice(index + 1)];
      render();
    };
    span.appendChild(textnode);
    node.appendChild(span);
    node.appendChild(button);
    node.ondragstart = e => {
      e.dataTransfer.setData('parentId', Number(e.currentTarget.dataset.parentid));
      e.dataTransfer.setData('id', Number(e.currentTarget.dataset.id));
    };
    completed.appendChild(node);
  });
  todoText.innerHTML = app.todo.length;
  progressText.innerHTML = app.progress.length;
  completedText.innerHTML = app.completed.length;
  totalTask.innerHTML = app.items.length;
};

render();

const addTodo = msg => {
  const currentElem = app.items[app.items.length - 1];
  const id = currentElem ? currentElem.id + 1 : 1;
  const newTodo = new todoitem(msg, id);
  app.items = [...app.items, newTodo];
  app.todo = [...app.todo, id];
  render();
  document.getElementById('taskName').value = '';
};

const onDrop = e => {
  const parentId = Number(e.dataTransfer.getData('parentid'));
  const id = Number(e.dataTransfer.getData('id'));
  if (parentId === 1) {
    const index = app.todo.indexOf(id);
    app.todo = [...app.todo.slice(0, index), ...app.todo.slice(index + 1)];
  } else if (parentId === 2) {
    const index = app.progress.indexOf(id);
    app.progress = [...app.progress.slice(0, index), ...app.progress.slice(index + 1)];
  } else if (parentId === 3) {
    const index = app.completed.indexOf(id);
    app.completed = [...app.completed.slice(0, index), ...app.completed.slice(index + 1)];
  }
  if (currentParentElement === 1) {
    app.todo = [...app.todo, id];
  } else if (currentParentElement === 2) {
    app.progress = [...app.progress, id];
  } else if (currentParentElement === 3) {
    app.completed = [...app.completed, id];
  }
  render();
};


const undoFunction = () => {
  const parentId = undoMemory[0].parentId;
  const id = undoMemory[0].item;
  const name = undoMemory[0].name;
  app.items = [...app.items, { id, name }];
  if (parentId === 1) {
    app.todo = [...app.todo, id];
  } else if (parentId === 2) {
    app.progress = [...app.progress, id];
  } else if (parentId === 3) {
    app.completed = [...app.completed, id];
  }
  undoMemory = [];
  render();
};

const onDragOver = e => {
  e.preventDefault();
  currentParentElement = Number(e.currentTarget.dataset.parentid);
};

progress.ondrop = onDrop;
progress.ondragover = onDragOver;
todo.ondrop = onDrop;
todo.ondragover = onDragOver;
completed.ondrop = onDrop;
completed.ondragover = onDragOver;
