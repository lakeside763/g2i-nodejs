const AppService = require("./app.service");
const prisma = require('./../../database');


class AcronymService extends AppService {
  async getAcronyms({ from, limit, ...rest }) {
    const take = parseInt(limit > 0 ? limit : 10);
    const skip = parseInt(from <= 1 ? 0 : (limit * (from - 1)));
    const search = rest.search.substring(1);
    const totalCount = await prisma.acronym.count({ where: { meaning: { contains: search } } });
    const data = await prisma.acronym.findMany({
      skip,
      take,
      where: { meaning: { contains: search } }
    });
    const count = data.length + skip;
    const desc = `Showing ${skip + 1} to ${count} of ${totalCount}`;
    return { count: desc, data};
  }

  async getAcronym({ acronym }) {
    return prisma.acronym.findFirst({ where: { acronym } });
  }
}

module.exports = AcronymService;

// const data = await prisma.acronym.findMany({
//   where: { meaning: { contains: search } }
// });
// const totalCount = data.length;
// const currentData = data.slice(skip, skip+take);
// const desc = `Showing ${skip + 1} to ${skip+currentData.length} of ${totalCount}`;
