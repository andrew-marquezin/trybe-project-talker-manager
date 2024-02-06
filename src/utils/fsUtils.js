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

async function getTalkerById(id) {
  try {
    const file = await fs.readFile(path.resolve(__dirname, jsonPath), 'utf-8');
    const data = JSON.parse(file);
    if (data) {
      const talker = data.find((t) => t.id === Number(id));
      return talker;
    }
  } catch (err) {
    console.log(`Erro ao resgatar o palestrante solicitado ${err.message}`);
  }
}

module.exports = {
  getTalkers,
  getTalkerById,
};