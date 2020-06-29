
exports.seed = async function(knex, Promise) {
  const generatedProductScans = [];
  const productScans = [
    {
      times: [new Date(2020,05,28,8,0,0,0), new Date(2020,05,28,8,15,0,0), new Date(2020,05,28,8,30,0,0)],
      count: 201
    },
    {
      times: [new Date(2020,05,28,9,0,0,0), new Date(2020,05,28,9,15,0,0), new Date(2020,05,28,9,30,0,0)],
      count: 1100
    },
    {
      times: [new Date(2020,05,28,10,0,0,0 ), new Date(2020,05,28,10,15,0,0 ), new Date(2020,05,28,10,30,0,0)],
      count: 1000
    },
    {
      times: [new Date(2020,05,28,11,0,0,0 ), new Date(2020,05,28,11,15,0,0 ), new Date(2020,05,28,11,30,0,0)],
      count: 950
    },
    {
      times: [new Date(2020,05,28,12,0,0,0 ), new Date(2020,05,28,12,15,0,0 ), new Date(2020,05,28,12,30,0,0)],
      count: 400
    },
  ];

  productScans.forEach(scan => {
    for (let i = 0; i < scan.count; i++) {
      const randomTime = scan.times[Math.floor(Math.random() * Math.floor(scan.times.length))]
      const randomProductNumber = Math.floor(Math.random() * Math.floor(100000));

      generatedProductScans.push({
          created_at: randomTime,
          updated_at: randomTime,
          product_number: randomProductNumber,
          line_id: 1,
      });
    }
  });

  await knex('product_scans').insert(generatedProductScans);
};
