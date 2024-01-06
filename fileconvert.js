'use strict'

import fs from "fs"
import { obj } from "./datadeck.js"
import converter from "json-2-csv"



let myObj = {
  "rows": [
    {
      value1: "New Visitor",
      value2: "(not set)",
      value3: "(not set)",
      value4: "0"
    },
    {
      value1: "New Visitor",
      value2: "(not set)",
      value3: "(not set)",
      value4: "mobile"
    },
    {
      value1: "New Visitor",
      value2: "(not set)",
      value3: "(not set)",
      value4: "mobile"
    },
    {
      value1: "New Visitor",
      value2: "(not set)",
      value3: "(not set)",
      value4: "mobile",
    }
  ]
}

let json2csvCallback = function(err, csv) {
  if (err) throw err;
  fs.writeFile('name.csv', csv, 'utf8', function(err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
      console.log('It\'s saved!');
    }
  });
};

const csv = converter.json2csv(myObj.rows, json2csvCallback, {
  prependHeader: false      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
});

const csvdata = converter.json2csv(obj.rows, json2csvCallback, {
  prependHeader: false      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
});


fs.writeFile('deck.csv', csvdata, 'utf8', function(err) {
  if (err) {
    console.log('some error ocurred')
  } else {
    console.log('saved')
  }
})


console.log(csvdata)
console.log(csv)
