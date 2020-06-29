const knex = require('./knex');
const { PubSub } = require('apollo-server');

const pubSub = new PubSub();
const PRODUCT_SCAN_ADDED = 'PRODUCT_SCAN_ADDED';

const user = {
  id: 1,
  name: 'Bill Tran',
}

module.exports = {
  Query: {
    me: () => user,
    getProductScansByDateAndHour: async (root, args) => {
      const { year, month, day, hour } = args;
      try {
        const startTime = new Date(year, month, day, hour);
        const endTime = new Date(year, month, day, hour, 59, 59, 59);
        const response = await knex('product_scans')
          .where('line_id', args.lineID)
          .where('created_at', '>=', startTime)
          .where('created_at', '<', endTime);

        return response;
      } catch (err) {
        console.log(err);
      }
    }
  },
  Mutation: {
    createProductScan: async (root, args) => {
      const { input } = args;
      try {
        const response = await knex('product_scans')
          .insert({
            ...input,
          }, ['id', 'product_number', 'line_id', 'created_at'])

        const getDate = new Date(response[0].created_at);
        const startTime = new Date(getDate.getFullYear(), getDate.getMonth(), getDate.getDate(), getDate.getHours());
        const endTime = new Date(getDate.getFullYear(), getDate.getMonth(), getDate.getDate(), getDate.getHours(), 59, 59, 59);

        const allProductScanByTime = await knex('product_scans')
          .where('line_id', response[0].line_id)
          .where('created_at', '>=', startTime)
          .where('created_at', '<', endTime);

        pubSub.publish(PRODUCT_SCAN_ADDED, { productScanAdded: allProductScanByTime });

        return allProductScanByTime;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Subscription: {
    productScanAdded: {
      subscribe: () => pubSub.asyncIterator([PRODUCT_SCAN_ADDED]),
    },
  },
}