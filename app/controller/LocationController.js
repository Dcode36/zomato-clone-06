const LocationModel = require('../model/LocationModel')
const locationlist = require("../resource/location.json")

const LocationController = {
    getlocationlist : async function(request,responce){
       try{
        let result = await LocationModel.find()
        responce.status(200).send({
            status : true,
            location: result,
           
        })
       }catch(error){
        responce.status(500).send({
            status :false,
            message:"server error",
            error,
        }) 
       }
      
    },
    
    addLocationList : async function(request, responce){
        try{
            let result = await LocationModel.insertMany(locationlist)
            responce.status(200).send({
                status : true,
                messege : "added succsefully",
                result : result,
            })
        }catch(error){
            responce.status(500).send({
                status :false,
                message:"server error",
                error,
            }) 

        }
    },
    getLocationByCity: async function (request, response) {
        let { city} = request.query;
        
        try {

          let result = await LocationModel.find({
            
            city : {$regex:city +".*", $options:"i"},



      
        });

          response.status(200).send({
            status: true,
            location: result,
            city
          });
        } catch (error) {
          response.status(500).send({
            status: false,
            message: "server error",
            error,
          });
        }
      },

}


module.exports = LocationController;