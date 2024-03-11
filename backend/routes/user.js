const router = require("express").Router();

const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const User = require("../models/User");

/* Get trip list */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(trips);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Your trips are not exist!", error: error.message });
  }
});

/* Add listing to wishlist */
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    const favouriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favouriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing is removed from wish list",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing is added from wish list",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
});

/* Get property list */
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(202).json(properties);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "The properties are not exist!", error: error.message });
  }
});

/* Get Reservation list */
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(reservations);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "The reservations are not exist!",
      error: error.message,
    });
  }
});

module.exports = router;
