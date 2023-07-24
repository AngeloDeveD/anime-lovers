'use strict';

const Path = require('path');
const express = require('express');
const App = express();
const fs = require('fs');

App.use(express.static(Path.join(__dirname)));
App.use(express.json());

App.get('/', (req, res) => {
    App.use(express.static(Path.join(__dirname + "/front")));
    res.sendFile(`${__dirname}/front/index.html`);
});

App.post('/save-data', (req, res) => {
    
    const data = req.body;
    console.log(data);
    // Чтение содержимого JSON-файла
    let fileData = fs.readFileSync('front/content.json', 'utf8');
    let jsonData = JSON.parse(fileData);

    // Обновление данных в JSON-файле
    jsonData.QueueToView = data.list1;
    jsonData.Waiting = data.list2;
    jsonData.ViewingNotCompleted = data.list3;

    // Сохранение обновлённых данных в JSON-файл
    fs.writeFileSync('front/content.json', JSON.stringify(jsonData, null, 4));

    // Отправка ответа клиенту
    res.send('Данные успешно сохранены');
});

App.listen(8082, function(){
    console.log('Application listening on port 8082');
});