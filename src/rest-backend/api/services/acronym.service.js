const AppService = require("./app.service");
const prisma = require('./../../database');
const ErrorResponse = require('./../../helpers/error_response.helper');

class AcronymService extends AppService {
  async getAcronyms({ from, limit, search }) {
    const take = parseInt(limit > 0 ? limit : 10);
    const skip = parseInt(from <= 1 ? 0 : (limit * (from - 1)));
    const totalCount = await prisma.acronym.count({ where: { meaning: { contains: search } } });
    const data = await prisma.acronym.findMany({
      skip,
      take,
      where: { meaning: { contains: search } }
    });
    const count = data.length + skip;
    const desc = data.length > 0 ? `Showing ${skip + 1} to ${count} of ${totalCount}` : `Showing null record`;
    return { count: desc, data};
  }

  async getAcronym({ acronym }) {
    return prisma.acronym.findFirst({ where: { acronym } });
  }

  async getAcronymsByRandomCount({ count }) {
    const acronyms = await prisma.acronym.findMany({ take: parseInt(count) });
    return this.randomizedAcronyms(acronyms);
  }

  async randomizedAcronyms(acronyms) {
    const oddObjects = [];
    const evenObjects = [];
    for (var i = 0; i < acronyms.length; i++) {
      const id = acronyms[i].id;
      if (id % 2 === 0) {
        evenObjects.push(acronyms[i]);
      } else {
        oddObjects.push(acronyms[i]);
      }
    }
    return [...evenObjects, ...oddObjects];
  }

  async createAcronym({ acronym, meaning }) {
    return prisma.acronym.create({ data: {
      acronym,
      meaning,
    }});
  }

  async updateAcronym({ params: { acronym }, body: { meaning } }) {
    const { id } = await prisma.acronym.findFirst({ where: { acronym } });
    return await prisma.acronym.update({
      where: { id },
      data: { meaning },
    });
  }

  async deleteAcronym({ acronym }) {
    const del_accronym = prisma.acronym.findFirst({ where: { acronym } });
    if (del_accronym) throw new ErrorResponse('Invalid acronym was provided', 400);
    return del_accronym;
  }
}

module.exports = AcronymService;

