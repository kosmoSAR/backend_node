const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    // req[property] se usa ya que la inforamción puede venir en re.body o req.params dependiendo del tipo de petición
    // AbortEarly surve para enviar todos los errores en conjunto y no, uno por uno
    const { error } = schema.validate(req[property], {abortEarly: false});
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler
