const emailCheck = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  next();
};

const passwordCheck = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(email)) {
    next();
  }
  res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length >= 6) {
    next();
  }
  res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
};

module.exports = {
  emailCheck,
  passwordCheck,
  validateEmail,
  validatePassword,
};