const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

let cars = [];
let nextId = 1;

router.get('/car', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'views', 'car.html'), 'utf-8', (err, html) => {
        if (err) {
            res.status(500).send('Server Error: Unable to load car details page.');
            return;
        }
        const $ = cheerio.load(html);
        if (cars.length === 0) {
            $('.car').html('No cars have been found.');
        } else {
            const lastCar = cars[cars.length - 1];
            $('.car').html(`
                <h2>Last added car</h2>
                <div><span class="bold">Make:</span> ${lastCar.make}</div>
                <div><span class="bold">Model:</span> ${lastCar.model}</div>
                <div><span class="bold">Year:</span> ${lastCar.year}</div>
                <div><span class="bold">Color:</span> ${lastCar.color}</div>
            `);
        }
        res.send($.html());
    });
});

router.get('/car/add', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-car.html'));
});

router.post('/car/add', (req, res) => {
    const { make, model, year, color } = req.body;
    const newCar = { id: nextId++, make, model, year, color };
    cars.push(newCar);
    res.redirect('/car/list'); 
});

router.get('/car/list', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'views', 'cars-list.html'), 'utf-8', (err, html) => {
        if (err) {
            res.status(500).send('Server Error: Unable to load cars list page.');
            return;
        }
        const $ = cheerio.load(html);
        if (cars.length === 0) {
            $('.cars').html('No cars have been found.');
        } else {
            let listContent = `<h2>Cars</h2><ul>`;
            cars.forEach(car => {
                listContent += `<li>
                    <p><span class="bold">Make:</span> ${car.make}</p>
                    <p><span class="bold">Model:</span> ${car.model}</p>
                    <p><span class="bold">Year:</span> ${car.year}</p>
                    <p><span class="bold">Color:</span> ${car.color}</p>
                </li>`;
            });
            listContent += `</ul>`;
            $('.cars').html(listContent);
        }
        res.send($.html());
    });
});

module.exports = router;



