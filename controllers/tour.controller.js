const { isValidObjectId } = require("mongoose");
const Tours = require("../models/Tour");
const {
  getToursServices,
  createTourServices,
} = require("../services/tour.services");

exports.getServices = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    // gt, lt, gte, lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt| gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);
    const queries = {};

    if (req.query.sort) {
      // name,image -> 'name image'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }
    if (req.query.fields) {
      // price,quantity -> 'price quantity'
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }
    //pagination
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
    const services = await getToursServices(filters, queries);
    res.status(200).json({
      status: "success",
      data: services,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const result = await createTourServices(req.body);

    result.logger();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.getSingleTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await Tours.findById(id);
    console.log(result);

    const imViewCount = await Tours.updateOne(
      { _id: id },
      { $inc: { view: 1 } }
    );
    if (!result || !isValidObjectId(id) || !imViewCount.acknowledged) {
      return res.status(400).json({ success: false, message: "no data found" });
    }

    res
      .status(200)
      .json({ success: true, message: "get tour details by id", data: result });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await Tours.updateOne(
      { _id: id },
      { $set: data },
      { runValidators: true }
    );

    if (!result.acknowledged || !isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "no data Updated" });
    }

    res
      .status(200)
      .json({ success: true, message: "tour Updated", data: result });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't Updated the data",
      error: error.message,
    });
  }
};

exports.getTrending = async (req, res, next) => {
  try {
    const result = await Tours.find().sort("-view").limit(3);
    res.status(200).json({
      success: true,
      message: "Trending tours",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get trending tours",
      error: error.message,
    });
  }
};

exports.getCheapest = async (req, res, next) => {
  try {
    const result = await Tours.find().sort("price").limit(3);
    res.status(200).json({
      success: true,
      message: "cheapest tours price",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get cheapest price data",
      error: error.message,
    });
  }
};
