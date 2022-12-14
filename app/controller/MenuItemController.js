let MenuItemsModel = require("../model/MenuItemModel");
let menuitems = require('../resource/menuitems.json');
let MenuItemController = {

  
  getMenuItem: async function (request, response) {
   
    //  ?rid=62c18f0cd8264e2ebaab5fe8
    let id = request.query.rid;
    id = id ? id : 0;

    try {
      let result = await MenuItemsModel.find({ restaurantId : id });
      response.status(200).send({
        status: true,
        menu_items: result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addMenuItem: async function (request, response) {
    try {
      let result = await MenuItemsModel.insertMany(menuitems);
      response.status(200).send({
        status: true,
        message: "MenuItemsModel added successfully",
        result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
};

module.exports = MenuItemController;
