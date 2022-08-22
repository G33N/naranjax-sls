const {
  CreateCardInputSchema,
} = require("../schema/input/createCardInputSchema");
const { createCard } = require("../service/createCard");
const { HttpResponseMapper } = require("@utilsV1/mappers/httpResponseMapper");

module.exports = async (commandPayload, commandMeta) => {
  new CreateCardInputSchema(commandPayload, commandMeta);

  return new HttpResponseMapper({
    data: { branches: [wholeBranch] },
    message: "POS_CREATED",
  });
};
