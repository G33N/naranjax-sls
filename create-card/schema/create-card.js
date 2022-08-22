const {
  InputValidationJoi,
} = require(`@shared/validations/InputValidationsJoi`);
const { string } = require("@shared/validations/dataTypes");

const schema = {
  birth: string,
};

class CreateCardInputSchema extends InputValidationJoi {
  constructor(payload, meta) {
    super({
      type: "BRANCH.CREATE",
      specversion: "v1.0.0",
      source: meta.source,
      payload,
      inputSchema: { schema, config: { strict: true } },
      strict: false,
    });
  }
}

module.exports = { CreateCardInputSchema };
