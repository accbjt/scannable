import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

export const CREATE_PRODUCT_SCAN = gql`
  mutation($line_id: Int!, $product_number: Int!) {
    createProductScan(
      input: {
        line_id: $line_id,
        product_number: $product_number
      }
    ) {
      id
      created_at
    }
  }
`;