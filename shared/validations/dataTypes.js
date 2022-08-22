const Joi = require("joi");

module.exports = {
  pattern_YYYYMMDD: /^\d{4}-\d{2}-\d{2}$/,
  number: Joi.number(),
  boolean: Joi.boolean(),
  string: Joi.string(),
  array: Joi.array(),
  forbidden: Joi.forbidden(),
  object: (schema) => Joi.object(schema),
  uuid: Joi.string().guid({
    version: ["uuidv4", "uuidv5"],
  }),
};
