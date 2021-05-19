const { services } = require('./../services/index');

module.exports = {
  getAcronyms: async ({ query }, res) => {
    try {
      const acronyms = await services.acronyms.getAcronyms(query);
      res.set('Content-Count', acronyms.count)
        .status(200)
        .json(acronyms)
    } catch (error) {
      return res.end(error.message);
    }
  },
  getAcronym: async({ params }, res) => {
    try {
      res.status(200).json(await services.acronyms.getAcronym(params));
    } catch (error) {
      return error;
    }
  },
  getAcronymsByRandomCount: async ({ params }, res) => {
    try {
      res.status(200).json(await services.acronyms.getAcronymsByRandomCount(params));
    } catch (error) {
      return error;
    }
  },
  createAcronym: async ({ body }, res) => {
    try {
      res.status(200).json(await services.acronyms.createAcronym(body));
    } catch(error) {
      return error;
    }
  },
  updateAcronym: async ({params, body}, res) => {
    try {
      res.status(200).json(await services.acronyms.updateAcronym({ params, body }))
    } catch (error) {
      return error;
    }
  },
  deleteAcronym: async ({ params }, res) => {
    try {
      res.status(200).json(await services.acronyms.deleteAcronym(params));
    } catch ({ statusCode, message}) {
      return res.status(statusCode).json({error: { message } }).end();
    }
  }
 }
