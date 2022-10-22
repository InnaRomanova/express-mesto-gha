const jwt = require('jsonwebtoken');
const {
  UNAUTHORIZED_ERROR_CODE,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  // достаю авторизованный заголовок
  const { authorization } = req.headers;
  // убеждаюсь, что он есть или начинается с Bearer
  if (!authorization || !authorization.startWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: 'Необходима авторизация' });
  }
  // Извлекаю токен
  const token = authorization.replace('Bearer ', '');
  let payload;
  // верифицирую токен
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправляю ошибку, если не получилось
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: 'Необходима авторизация' });
  }
  // записываю пейлоуд в объект запроса
  req.user = payload;
  // пропускаю запрос дальше
  next();
};
