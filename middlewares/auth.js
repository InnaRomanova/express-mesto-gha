const jwt = require('jsonwebtoken');
const { JWT } = require('../utils/constants');
const UnauthorixedErrorCode = require('../errors/unauthorixedErrorCode');

module.exports = (req, _, next) => {
  const { token } = req.cookies;
  // убеждаюсь, что он есть или начинается с Bearer
  if (!token) {
    throw new UnauthorixedErrorCode('Необходима авторизация');
  }

  let payload;
  // верифицирую токен
  try {
    payload = jwt.verify(token, JWT);
  } catch (err) {
    next(new UnauthorixedErrorCode('Необходима авторизация'));
    // отправляю ошибку, если не получилось
  }
  // записываю пейлоуд в объект запроса
  req.user = payload;
  // пропускаю запрос дальше
  next();
};
