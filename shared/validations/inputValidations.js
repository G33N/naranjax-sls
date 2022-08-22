const { InputValidation } = require("nbased/schema/inputValidation");
const { DownstreamCommand } = require("nbased/schema/downstreamCommand");

const {
  validateJoi,
  validateRequestJoi,
  validateResponseJoi,
} = require("./validate");

class InputValidationJoi extends InputValidation {
  constructor(obj) {
    super(obj);
  }
  validate() {
    return validateJoi(this);
  }
}

class DownstreamCommandJoi extends DownstreamCommand {
  constructor(obj) {
    super(obj);
  }
  validateRequest() {
    return validateRequestJoi(this);
  }
  validateResponse(response) {
    return validateResponseJoi(response, this);
  }
}

module.exports = { InputValidationJoi, DownstreamCommandJoi };
