import './style.css';
const url =
  'https://us-central1-todo-list-napoleonit.cloudfunctions.net/webApi/api/v1/';

const menuButton = document.getElementById('show-menu');
const myList = document.getElementById('list-menu');

const clickMenu = (evt) => {
  const element = evt.currentTarget.element;
  if (element.completed) {
    menuButton.innerText = 'Дело сделано!';
    myList.innerHTML = '';
  } else {
    menuButton.innerText = 'Не забудь' + ' ' + element.label.toLowerCase();
    myList.innerHTML = '';
  }
};

const showMenu = async () => {
  let listText = [];
  const hasList = document.querySelectorAll('.listItem');
  console.log(hasList);
  if (hasList.length > 0) {
    myList.innerHTML = '';
    return menuButton.innerText = 'Выберите опцию';
  }
  await fetch(url + 'getToDos', { method: 'GET' })
    .then((response) => response.json())
    .then((responseText) => {
      myList.innerHTML = '';
      listText = responseText;
    });
  listText.forEach((element) => {
    const containerList = document.createElement('div');
    const listItem = document.createElement('button');
    const imgComplete = document.createElement('img');
    listItem.classList.add('listItem');
    imgComplete.classList.add('markComplete')
    containerList.classList.add('containerList');
    if (element.completed) {
      listItem.innerText = element.label;
      imgComplete.src = 'https://cdn-icons-png.flaticon.com/512/18/18442.png';
    } else {
      listItem.innerText = element.label;
      imgComplete.src = 'https://cdn-icons-png.flaticon.com/512/17/17124.png';
    }
    myList.append(containerList);
    containerList.append(listItem);
    containerList.append(imgComplete);
    listItem.element = element;
    listItem.onclick = clickMenu;
  });
};

menuButton.onclick = showMenu;