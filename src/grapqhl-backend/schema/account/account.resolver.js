module.exports = {
  Query: {
    getAccounts: async (root, args, { dataSources }) => {
      try {
        return await dataSources.accounts.getAccounts();
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createAccount: async (root, args, { dataSources }) => {
      try {
        return await dataSources.accounts.createAccount();
      } catch (error) {
        return error;
      }
    },
  },
};
