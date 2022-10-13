const LocationModel = require('../model/LocationModel')
const ResaurantModel = require('../model/RestaurantModel')
const RestaurantList = require("../resource/restaurant.json")

const RestaurantController = {
    gerRestaurantList: async function (request, responce) {
        try {
            let result = await ResaurantModel.find()
            responce.status(200).send({
                status: true,
                restaurant: result,

            })
        } catch (error) {
            responce.status(500).send({
                status: false,
                message: "server error",
                error,
            })
        }

    },

    addRestaurantList: async function (request, responce) {
        try {
            let result = await ResaurantModel.insertMany(RestaurantList)
            responce.status(200).send({
                status: true,
                messege: "added succsefully",
                result: result,
            })
        } catch (error) {
            responce.status(500).send({
                status: false,
                message: "server error",
                error,
            })

        }
    },

    getRestaurnatById: async function (request, responce) {

        try {
            let { id } = request.params;
            let data = await ResaurantModel.findById(id)

            responce.status(200).send({
                status: true,
                result: data,
            })
        } catch (error) {
            responce.status(500).send({
                status: false,
                message: "server error",
                error,
            })
        }

    },

    getRestaurnatByLocationId : async function(request,responce){
        let { lid , rest } = request.query;
      try{

        let data = await ResaurantModel.find({
            name :{$regex:rest  + ".*", $options: " i"},
            location_id:Number(lid),

        },{name:1,image:1,locality:1,_id:1 , city : 1});
        responce.status(200).send({
            status : true,
            result : data,

        })
      }catch (error) {
        responce.status(500).send({
            status: false,
            message: "server error",
            error,
        })
    }
    },
    filterRestaurant : async function(request, responce){
        let { mealtype, location, cuisine, lcost, hcost, page,sort,itemsPerPage} = request.body;
        sort = sort ? sort : 1;
        page = page ? page : 1;
        itemsPerPage = itemsPerPage ? itemsPerPage : 2;
     
        
        let staringIndex = page * itemsPerPage - itemsPerPage; 
        let lastIndex = page * itemsPerPage; 

        let filterObject = {};

        if (mealtype) filterObject['mealtype_id'] = mealtype; 
        if (location) filterObject['location_id'] = location;

        if(lcost && hcost) filterObject[ 'min_price'] = { $lte :hcost , $gte: lcost }
        if (cuisine) filterObject['cuisine_id'] = { $in : cuisine};
       


        try{
        let result = await ResaurantModel.find(filterObject,{
            aggregate_rating : 1,
            city : 1,
            image : 1,
            locality :1,
            name : 1,
            min_price :1,
            cuisine : 1,

        }).sort({
            min_price:sort
        });

        const filterResult = result.slice(staringIndex, lastIndex)

        responce.status(200).send({
            status : true,
            result : filterResult,
        })
    }catch (error) {
        responce.status(500).send({
            status: false,
            message: "server error",
            error,
        })
    }
    }
}
 

module.exports = RestaurantController;