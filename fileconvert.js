'use strict'

import fs from "fs"
import converter from "json-2-csv"

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

export const ConverterFile = (obj) => {

  const csvdata = converter.json2csv(obj, json2csvCallback, {
    prependHeader: true      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
  });

  fs.writeFile('deck.csv', csvdata, 'utf8', function(err) {
    if (err) {
      console.log('some error ocurred')
    } else {
      console.log('csv saved correctly')
    }
  })
}
