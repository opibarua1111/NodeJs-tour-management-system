const express = require("express");
const router = express.Router();
const tourController = require("../../controllers/tour.controller");

router.route("/tour/trending").get(tourController.getTrending);
router.route("/tour/cheapest").get(tourController.getCheapest);

router
  .route("/tours")
  .get(tourController.getServices)
  .post(tourController.createTour);

router
  .route("/tours/:id")
  .get(tourController.getSingleTourById)
  .patch(tourController.updateById);

module.exports = router;
