'use strict';
const list1 = document.querySelector('#list1 ul');
const list2 = document.querySelector('#list2 ul');
const list3 = document.querySelector('#list3 ul');

const input = document.querySelector('#input');

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');


addEventListener("DOMContentLoaded", ()=> CumThisShit());
function CumThisShit()
{
    // Загрузка JSON-файла
    fetch('content.json')
        .then(response => response.json())
        .then(obj => {
            // Заполнение списка 1
            let list1 = document.querySelector('#list1 ul');
            obj.QueueToView.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            list1.appendChild(li);
        });

            // Заполнение списка 2
            let list2 = document.querySelector('#list2 ul');
            obj.Waiting.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            list2.appendChild(li);
        });

            // Заполнение списка 3
            let list3 = document.querySelector('#list3 ul');
            obj.ViewingNotCompleted.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            list3.appendChild(li);
        });
    });

}

// Функция для сохранения данных на сервере
function SaveData() {
    // Создание объекта с данными для отправки на сервер
    let data = {
        list1: [],
        list2: [],
        list3: []
    };

    // Получение данных из списка 1
    list1.querySelectorAll('li').forEach(li => {
        data.list1.push(li.textContent);
    });

    // Получение данных из списка 2
    list2.querySelectorAll('li').forEach(li => {
        data.list2.push(li.textContent);
    });

    // Получение данных из списка 3
    list3.querySelectorAll('li').forEach(li => {
        data.list3.push(li.textContent);
    });

    // Отправка данных на сервер с помощью AJAX-запроса
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/save-data');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(data));
}

// Добавление обработчика событий для кнопки "Сохранить"
document.querySelector('#save-button').addEventListener('click', SaveData);

button1.addEventListener('click', () => {
    if (input.value) {
        const li = document.createElement('li');
        li.textContent = input.value;
        list1.appendChild(li);
        input.value = '';
    }
});

button2.addEventListener('click', () => {
    if (input.value) {
        const li = document.createElement('li');
        li.textContent = input.value;
        list2.appendChild(li);
        input.value = '';
    }
});

button3.addEventListener('click', () => {
    if (input.value) {
        const li = document.createElement('li');
        li.textContent = input.value;
        list3.appendChild(li);
        input.value = '';
    }
});
