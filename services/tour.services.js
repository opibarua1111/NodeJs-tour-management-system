const Tour = require("../models/Tour");

exports.getToursServices = async (filters, queries) => {
  const Tours = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Tour.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, Tours };
};

exports.createTourServices = async (data) => {
  const tour = await Tour.create(data);
  console.log(tour);
  return tour;
};
