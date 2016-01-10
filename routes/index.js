var express = require('express');
var router = express.Router();
var excelParser = require('excel-parser');


function readExcelFile(res){
    excelParser.parse({
      inFile: 'Book1.xlsx',
      worksheet: 1,
      skipEmpty: false,
    },function(err, records){
        res.json({ records: records });
        if(err) {
          console.error(err);
        }
    });
}


function index(req, res, next) {
    res.render('index', { title: 'Table',  customScript: 'main.js' });
}

function data(req, res, next) {
    readExcelFile(res);
}

function map(req, res, next) {
    res.render('map', { title: 'Map',  customScript: 'map.js' });
}

router
    .get('/', index)
    .get('/data', data)
    .get('/map', map);

module.exports = router;
