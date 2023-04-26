const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UsersList, addUserInStore } = require("../data");
const User = require("../database/models/UserModel");

/* Register new user
    Mandatory Inputs - req.body.email && req.body.password
*/
const register = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            Response: {
                code: StatusCodes.BAD_REQUEST,
                message: "Please Provide Required Information"
            }
        });
    }

    /* below code is to user static UsersList
    const found = UsersList.some(el => el.email === email);
    console.log("User found status while Register:- " + found);
    if (found) {
        res.status(200).json({
            Response: {
                statusCode: 409,
                Message: "User email already exists.",
            }
        })
    }
    else {
        addUserInStore(req.body);
        res.status(201).json({
            Response: {
                statusCode: 201,
                Message: "User created successfully.",
            }
        })
    }
    */

    const hash_password = await bcrypt.hash(password, 10);

    const userData = {
        email,
        password: hash_password,
    };

    const user = await User.findOne({ email });

    if (user) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
            Response: {
                statusCode: StatusCodes.NOT_ACCEPTABLE,
                message: "User already registered"
            }
        });
    }
    User.create(userData).then((data, err) => {
        if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
        else {
            console.log("New User created successfully.");
            res.status(StatusCodes.CREATED).json({
                Response: {
                    statusCode: StatusCodes.CREATED,
                    message: "User created Successfully"
                }
            });
        }
    });

}

/* Authenticate the User
    Mandatory Inputs - req.body.email && req.body.password
*/
const signIn = async (req, res) => {
    // if (req.body && req.body.email && req.body.password) {
    //     const email = req.body.email;
    //     const password = req.body.password;

    //     const found = UsersList.some(el => el.email === email && el.password === password);
    //     console.log("User Found status while Login:- " + found);
    //     if (found) {
    //         res.status(200).json({
    //             Response: {
    //                 statusCode: 200,
    //                 Message: "User LoggedIn Successfully",
    //             }
    //         })
    //     }
    //     else {
    //         res.status(400).json({
    //             Response: {
    //                 statusCode: 400,
    //                 Message: "Invalid email or password",
    //             }
    //         })
    //     }
    // } else {
    //     res.status(400).json({
    //         Response: {
    //             statusCode: 400,
    //             Message: "Missing email or password",
    //         }
    //     })
    // }

    try {
        console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                Response: {
                    code: StatusCodes.BAD_REQUEST,
                    message: "Please enter email and password."
                }
            });
        }

        const user = await User.findOne({ email: email });

        console.log(user);

        if (user) {
            const isMatched = bcrypt.compareSync(password, user.password);

            if (isMatched) {
                console.log("User Authenticated..");
                const token = jwt.sign(
                    { _id: user._id, role: user.role || 'user' },
                    process.env.SECRET_KEY, { expiresIn: "30d" });

                const { _id, email, role } = user;
                console.log("User logged in successfully..");
                res.status(StatusCodes.OK).json({
                    Response: {
                        token,
                        user: { _id, email, role },
                        statusCode: StatusCodes.OK,
                        message: "user logged in successfully"
                    }
                });
            } else {
                console.log("Incorrect Password..");
                res.status(StatusCodes.UNAUTHORIZED).json({
                    Response: {
                        statusCode: StatusCodes.UNAUTHORIZED,
                        message: "Incorrect Password"
                    }
                });
            }
        } else {
            console.log('No user found with this email.');
            res.status(StatusCodes.NOT_FOUND).json({
                Response: {
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "No user found with this email.",
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            Response: {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: error
            }
        });
    }
}

module.exports = { register, signIn }