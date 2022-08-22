const { ErrorHandled, FaultHandled } = require("nbased/util/error");
const { validationSkipped } = require("nbased/_metric/warning");
const Joi = require("joi");
const ERROR_CODES = {
  CLIENT_VALIDATION_FAILED: "CLIENT_VALIDATION_FAILED",
  CREATION_FAULT: "METRIC_EVENT_CREATION_FAULT",
  REQUEST_FAULT: "REQUEST_VALIDATION_FAILED",
  RESPONSE_FAULT: "RESPONSE_VALIDATION_FAILED",
};

const validateJoi = (objValidate) => {
  if (!objValidate.schema.schema)
    throw new FaultHandled("Missing schema", {
      code: ERROR_CODES.CREATION_FAULT,
      layer: objValidate.type,
    });

  const joiSchema = Joi.object(objValidate.schema.schema).unknown(
    !objValidate.schema.config.strict || false
  );

  const { error } = joiSchema.validate(objValidate.payload, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const message = error.details.map((element) => {
      return element.message;
    });
    const errorMessage = new ErrorHandled(message, {
      code: ERROR_CODES.CLIENT_VALIDATION_FAILED,
      layer: objValidate.type,
    });

    objValidate.publish();
    throw errorMessage;
  }

  return objValidate.payload;
};

const validateRequestJoi = (objValidate) => {
  if (!objValidate.requestSchema.requestSchema)
    return validationSkipped(this.type);

  const joiSchema = Joi.object(objValidate.requestSchema.requestSchema).unknown(
    !objValidate.requestSchema.config.strict || false
  );

  const { error } = joiSchema.validate(objValidate.payload, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const message = error.details.map((element) => {
      return element.message;
    });

    throw new FaultHandled(message, {
      code: ERROR_CODES.REQUEST_FAULT,
      layer: this.type,
    });
  }

  return objValidate.payload;
};

const validateResponseJoi = (response, objValidate) => {
  if (!objValidate.responseSchema.responseSchema)
    return validationSkipped(this.type);

  const joiSchema = Joi.object(
    objValidate.responseSchema.responseSchema
  ).unknown(!objValidate.responseSchema.config.strict || false);

  const { error } = joiSchema.validate(response, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const message = error.details.map((element) => {
      return element.message;
    });

    throw new FaultHandled(message, {
      code: ERROR_CODES.RESPONSE_FAULT,
      layer: this.type,
    });
  }

  return objValidate.payload;
};

module.exports = { validateJoi, validateRequestJoi, validateResponseJoi };
