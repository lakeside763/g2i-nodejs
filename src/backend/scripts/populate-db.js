const fs = require('fs');
const path = require('path');
const prisma = require('./../database');

const loadData = async () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../', 'raw-data.json'), 'utf8');
    return (JSON.parse(data));
  } catch (error) {
    return error;
  }
}

const storeData = async (data) => {
  try {
    return fs.writeFileSync(path.join(__dirname, './../', 'db.json'), JSON.stringify(data))
  } catch (error) {
    return error;
  }
}

const populateDB = async () => {
  console.log('Start populating...');
  const { data } = await loadData();
  const acronym_data = await Promise.all(data.map(async (obj) => {
    for (const [key, value] of Object.entries(obj)) {
      await prisma.acronym.create({
        data: {
          acronym: key,
          meaning: value,
         },
      });
      return { acronym: key, meaning: value }
    }
  })).then((response) => response.flat());
  await storeData({ data: acronym_data });
  console.log('Data processed successfully');
}


populateDB();
