const { getTalkerById } = require('../utils/fsUtils');

const tokenAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return res.status(401).send({ message: 'Token inválido' });
  }

  next();
};

const nameCheck = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageCheck = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }

  if (typeof age !== 'number'
  || !Number.isInteger(age)
  || age < 18) {
    return res.status(400).send({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }

  next();
};

const talkCheck = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório',
    });
  }

  next();
};

const watchedCheck = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt) {
    return res.status(400).send({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(watchedAt)) {
    return res.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const rateValidation = (rate) => (!Number.isInteger(rate)
  || rate < 1
  || rate > 5);

const rateCheck = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === null || rate === undefined) {
    return res.status(400).send({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (rateValidation(rate)) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
};

const validIdCheck = async (req, res, next) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) {
    return res.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  next();
};

module.exports = {
  tokenAuth,
  nameCheck,
  ageCheck,
  talkCheck,
  watchedCheck,
  rateCheck,
  validIdCheck,
};