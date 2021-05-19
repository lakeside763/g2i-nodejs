const fs = require('fs');
const path = require('path');
const prisma = require('../database');

const readData = async () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../', 'raw-data.json'), 'utf-8');
    return (JSON.parse(data));
  } catch (error) {
    return error;
  }
};

const populateDB = async () => {
  const { data } = await readData();
  await Promise.all(data.map(async (obj) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(obj)) {
      // eslint-disable-next-line no-await-in-loop
      await prisma.acronym.create({
        data: {
          acronym: key,
          meaning: value,
        },
      });
    }
  }));
};

populateDB();
