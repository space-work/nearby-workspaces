const fs = require('fs');
const geocoder = require('./geocoder');
const { array1, array2, array3 } = require('./addresses');

// use batch geocode to get array of addresses
const batchGeocode = (addressArray) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await geocoder.batchGeocode(addressArray);
      let codes = res.map(obj => obj.value[0]);
      codes = codes.filter(code => code);
      resolve(codes);
    } catch (error) {
      reject(error);
    }
  })
    .catch(err => { throw err });
};

// write geojson data to file
const writeDataToFile = (arrayOfAddresses, fileNumber = 1) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`geojsonData${fileNumber}.json`, JSON.stringify(arrayOfAddresses), (err) => {
      if (err) reject(err);
      else resolve();
    })
  })
    .catch(err => { throw err });
};

// get geocodes from array and write to file
const getAndWriteGeoCodes = async (arrayOfAddresses, fileNumber = 1) => {
  try {
    const geocodes = await batchGeocode(arrayOfAddresses);
    await writeDataToFile(geocodes, fileNumber);
    console.log('file written');
  } catch (error) {
    throw error;
  }
};

// check command line args and geocode appropriate chunk of addresses
const seed = async () => {
  try {
    if (process.argv[2] === '-g') {
      let num = process.argv[3];
      if (num === '1') {
        await getAndWriteGeoCodes(array1, 1);
        console.log('Array 1 written to file');
      } else if (num === '2') {
        await getAndWriteGeoCodes(array2, 2);
        console.log('Array 2 written to file');
      } else if (num === '3') {
        await getAndWriteGeoCodes(array3, 3);
        console.log('Array 3 written to file');
      } else {
        console.log('Unknown command');
      }
      process.exit();
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seed();


