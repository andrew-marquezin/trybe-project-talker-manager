const fs = require('fs').promises;
const path = require('path');

const jsonPath = '../talker.json';

async function getTalkers() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, jsonPath), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(`Erro ao buscar os palestrantes: ${err.message}`);
    return [];
  }
}

module.exports = {
  getTalkers,
};