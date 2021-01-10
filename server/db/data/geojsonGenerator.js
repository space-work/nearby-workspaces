
// use batch geocode to get array of addresses
const batchGeocode = (addressArray) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await geocoder.batchGeocode(addressArray);
      console.log(res)
      let codes = res.map(obj => obj.value[0]);
      codes = codes.filter(code => code);
      resolve(codes);
    } catch (error) {
      reject(error)
    }
  })
    .catch(err => { throw err });
};

const writeAddressToFile = (arrayOfAddresses) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('addresses.json', JSON.stringify(arrayOfAddresses), (err) => {
      if (err) reject(err);
      else resolve();
    })
  })
    .catch(err => { throw err });
};

const getAndWriteGeoCodes = async (arrayOfAddresses) => {
  try {
    const geocodes = await batchGeocode(arrayOfAddresses);
    await writeAddressToFile(geocodes);
    console.log('file written');
  } catch (error) {
    console.log(error.message);
  }
};

getAndWriteGeoCodes(addresses);

