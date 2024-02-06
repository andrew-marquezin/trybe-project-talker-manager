const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

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

function tokenGenerator() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

async function registerNewTalker(req) {
  try {
    const data = await getTalkers();
    const { name, age, talk } = req;
    const { watchedAt, rate } = talk;
    const talker = { id: data.length + 1,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      } };
    const newData = JSON.stringify([...data, talker]);
    await fs.writeFile(path.resolve(__dirname, jsonPath), newData);
    console.log(talker);
    return talker;
  } catch (err) {
    return (`Erro ao registrar palestrante: ${err.message}`);
  }
}

module.exports = {
  getTalkers,
  getTalkerById,
  tokenGenerator,
  registerNewTalker,
};