const express = require('express');
const {
  getTalkers,
  getTalkerById,
  tokenGenerator,
  registerNewTalker,
  updateTalker,
  deleteTalker,
} = require('./utils/fsUtils');
const {
  emailCheck,
  passwordCheck,
  validateEmail,
  validatePassword,
} = require('./middlewares/loginMiddleware');
const { tokenAuth,
  nameCheck,
  ageCheck,
  talkCheck,
  watchedCheck,
  rateCheck,
  validIdCheck,
} = require('./middlewares/talkerMiddleware');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await getTalkers();
  return res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const foundTalker = await getTalkerById(id);

  if (!foundTalker) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(foundTalker);
});

app.post('/login', emailCheck, passwordCheck, validateEmail, validatePassword, (req, res) => {
  const token = tokenGenerator();
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
  tokenAuth,
  nameCheck,
  ageCheck,
  talkCheck,
  watchedCheck,
  rateCheck,
  async (req, res) => {
    try {
      const talker = await registerNewTalker(req.body);
      res.status(201).json(talker);
    } catch (err) {
      console.log(err.message);
    }
  });

app.put('/talker/:id',
  tokenAuth,
  nameCheck,
  ageCheck,
  talkCheck,
  watchedCheck,
  rateCheck,
  validIdCheck,
  async (req, res) => {
    try {
      const talker = await updateTalker(Number(req.params.id), req.body);
      res.status(HTTP_OK_STATUS).send(talker);
    } catch (err) {
      console.log(err.message);
    }
  });

app.delete('/talker/:id', tokenAuth, async (req, res) => {
  try {
    await deleteTalker(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
