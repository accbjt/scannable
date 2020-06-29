import gql from 'graphql-tag';

export const PRODUCT_SCAN_SUBSCRIPTION = gql`
  subscription {
    productScanAdded {
      line_id
      created_at
    }
  }
`;
