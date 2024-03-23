const express = require('express');
const router = express.Router();
const  meal_type= require('../controller/MealTypeController');
const location = require('../controller/LocationController');
const restaurant = require('../controller/RestaurantController');
const users = require('../controller/UserController');
const menu_item = require('../controller/MenuItemController')
const paymentController  = require('../controller/PaymentController')

router.get('/',meal_type.apiHome);
// meal
router.get('/get-meal-type',meal_type.getMealTypes);
router.post('/add-meal-type', meal_type.addMealType);

// location
router.get('/get-location',location.getlocationlist);
router.post('/add-location', location.addLocationList);
router.get('/get-location-by-city', location.getLocationByCity)
// restaurant

router.get('/get-restaurant',restaurant.gerRestaurantList );
router.post('/add-restaurant', restaurant.addRestaurantList);
router.get('/get-restaurant-by-id/:id',restaurant.getRestaurnatById);
router.get('/get-restaurnat-by-location-id/',restaurant.getRestaurnatByLocationId)
router.post('/filter', restaurant.filterRestaurant)

// Users 
router.post('/sign-up', users.userSignUp);
router.post('/login', users.userLogin)

// Menu item

router.get("/get-menu-item", menu_item.getMenuItem);
router.post("/add-menu-item", menu_item.addMenuItem);


// payment

router.post("/payment", paymentController.payment); // react
// router.post("/callback", paymentController.callback); // internal


module.exports  = router;