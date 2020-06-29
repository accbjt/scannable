import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

export const getLineProductScansByDateAndHour = async (lineID) => {
  const currentDate = new Date();

  const response = await client.query({
    query: gql`
      {
        eight: getProductScansByDateAndHour(
          year: 2020,
          month: 5,
          day: 28,
          hour: 8,
          lineID:	${lineID}
        ) {
          id
          line_id
          created_at
          product_number
        },
        nine: getProductScansByDateAndHour(
          year: 2020,
          month: 5,
          day: 28,
          hour: 9,
          lineID:	${lineID}
        ) {
          id
          line_id
          created_at
          product_number
        },
        ten: getProductScansByDateAndHour(
          year: 2020,
          month: 5,
          day: 28,
          hour: 10,
          lineID:	${lineID}
        ) {
          id
          line_id
          created_at
          product_number
        },
        eleven: getProductScansByDateAndHour(
          year: 2020,
          month: 5,
          day: 28,
          hour: 11,
          lineID:	${lineID}
        ) {
          id
          line_id
          created_at
          product_number
        },
        twelve: getProductScansByDateAndHour(
          year: 2020,
          month: 5,
          day: 28,
          hour: 12,
          lineID:	${lineID}
        ) {
          id
          line_id
          created_at
          product_number
        },
        one: getProductScansByDateAndHour(
          year: ${currentDate.getFullYear()},
          month: ${currentDate.getMonth()},
          day: ${currentDate.getDate()},
          hour: ${currentDate.getHours()},
          lineID:	${lineID}
        ) {
          id
          line_id
          created_at
          product_number
        }
      }
    `
  });

  return response.data;
};

export const getCurrentProductScansByDateAndHour = async () => {
  const currentDate = new Date();
  const response = await client.query({
    query: gql`
      {
        line1: getProductScansByDateAndHour(
          year: ${currentDate.getFullYear()},
          month: ${currentDate.getMonth()},
          day: ${currentDate.getDate()},
          hour: ${currentDate.getHours()},
          lineID:	1
        ) {
          id
          line_id
          created_at
          product_number
        },
        line2: getProductScansByDateAndHour(
          year: ${currentDate.getFullYear()},
          month: ${currentDate.getMonth()},
          day: ${currentDate.getDate()},
          hour: ${currentDate.getHours()},
          lineID:	2
        ) {
          id
          line_id
          created_at
          product_number
        },
        line3: getProductScansByDateAndHour(
          year: ${currentDate.getFullYear()},
          month: ${currentDate.getMonth()},
          day: ${currentDate.getDate()},
          hour: ${currentDate.getHours()},
          lineID:	3
        ) {
          id
          line_id
          created_at
          product_number
        },
        line4: getProductScansByDateAndHour(
          year: ${currentDate.getFullYear()},
          month: ${currentDate.getMonth()},
          day: ${currentDate.getDate()},
          hour: ${currentDate.getHours()},
          lineID:	4
        ) {
          id
          line_id
          created_at
          product_number
        },
        line5: getProductScansByDateAndHour(
          year: ${currentDate.getFullYear()},
          month: ${currentDate.getMonth()},
          day: ${currentDate.getDate()},
          hour: ${currentDate.getHours()},
          lineID:	5
        ) {
          id
          line_id
          created_at
          product_number
        },
        line6: getProductScansByDateAndHour(
          year: ${currentDate.getFullYear()},
          month: ${currentDate.getMonth()},
          day: ${currentDate.getDate()},
          hour: ${currentDate.getHours()},
          lineID:	6
        ) {
          id
          line_id
          created_at
          product_number
        },
        line7: getProductScansByDateAndHour(
          year: ${currentDate.getFullYear()},
          month: ${currentDate.getMonth()},
          day: ${currentDate.getDate()},
          hour: ${currentDate.getHours()},
          lineID:	7
        ) {
          id
          line_id
          created_at
          product_number
        },
        line8: getProductScansByDateAndHour(
          year: ${currentDate.getFullYear()},
          month: ${currentDate.getMonth()},
          day: ${currentDate.getDate()},
          hour: ${currentDate.getHours()},
          lineID:	8
        ) {
          id
          line_id
          created_at
          product_number
        }
      }
    `
  });

  return response.data;
};