const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: Int
    name: String
  }

  type Line {
    id: Int
    name: String
    location: String
  }

  type ProductScan {
    id: Int
    line_id: Int
    product_number: Int
    created_at: String
    updated_at: String
  }

  input CreateProductScan {
    line_id: Int
    product_number: Int
  }

  type Query {
    me: User
    getProductScansByDateAndHour(year: Int!, month: Int!, day: Int!, hour: Int!, lineID: Int!): [ProductScan!]!
  }

  type Mutation {
    createProductScan(input: CreateProductScan!): [ProductScan!]!
  }

  type Subscription {
    productScanAdded: [ProductScan!]!
  }
`;