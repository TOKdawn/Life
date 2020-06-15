

// 'use strict'
// var fs = require('fs')

// var rs = fs.createReadStream('./score.json','utf-8');
// rs.on('data', function (chunk) {
//     console.log('DATA:')
//     console.log(chunk);
// });

// rs.on('end', function () {
//     console.log('END');
// });

// rs.on('error', function (err) {
//     console.log('ERROR: ' + err);
// });
import {score} from './score.js'
var scoreData = score.data;
for(var i = 0;i<scoreData.length&&i<3;i++){
    console.log(scoreData[i])
}