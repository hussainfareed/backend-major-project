const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing, validateReview } = require("../middleware.js");
const { findById } = require("../models/user.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
.get(WrapAsync(listingController.index))
.post(isLoggedIn,validateListing, upload.single('listing[image]'), WrapAsync(listingController.createListing));


//NEW ROUTE:
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get(WrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, WrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, WrapAsync(listingController.destroyListing))




//EDIT ROUTE:
router.get("/:id/edit", isLoggedIn, isOwner, WrapAsync(listingController.renderEditForm));


module.exports = router;