const acronmyService = require('./../services/acronym.service');
const { services } = require('./../services/index');


const acronyms = new acronmyService();
module.exports = {
  getAcronyms: async ({ query }, res) => {
    try {
      res.status(200).json(await services.acronyms.getAcronyms(query));
    } catch (error) {
      return error;
    }
  },
  getAcronym: async({ params }, res) => {
    try {
      res.status(200).json(await services.acronyms.getAcronym(params));
    } catch (error) {
      return error;
    }
  }
}
