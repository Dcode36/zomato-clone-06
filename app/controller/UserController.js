const UserModel = require('../model/UserModel')
const UserController = {

    userSignUp: async function (request, responce) {
        let data = request.body;

        try {
            // insert the user
            const newUser = new UserModel({
                email: data.email,
                password: data.password,
                firstname: data.firstname ? data.firstname : undefined,
                lastname: data.lastname ? data.lastname : undefined,
            });

            let result = await UserModel.findOne({ email: data.email });
            // check already exit user
            if (result) {
                responce.status(200).send({
                    status: false,
                    message: "Email is Already in Use please user another Email"
                })
            } else {
                let saveResult = await newUser.save()

                responce.status(200).send({
                    status: true,
                    result: saveResult,
                })
            }

        } catch (error) {
            response.status(500).send({
                status: false,
                message: "server error",
                error,
            });
        }
    },
    userLogin: async function (request, responce) {
        let data = request.body

        try {

            let result = await UserModel.findOne({
                email: data.email,

            });

            if (result) {
                if (result.password === data.password) {
                    let { _id, email, firstname, lastname } = result;

                    responce.status(200).send({
                        status: true,
                        result: {
                            _id,
                            email,
                            firstname,
                            lastname,
                        },
                        message: "Login succesfully"
                    });
                } else {
                    responce.status(200).send({
                        status: true,
                        message: " password is wrong"
                    })
                }
            } else {
                responce.status(200).send({
                    status: true,
                    message: "username and password is wrong"
                },)
            }


        } catch (error) {
            response.status(500).send({
                status: false,
                message: "server error",
                error,
            });
        }
    }
}

module.exports = UserController;