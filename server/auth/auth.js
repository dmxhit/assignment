const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Registor new user
 */
exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({ id: user._id, email }, jwtSecret, {
          expiresIn: maxAge, // 3hrs
        });

        res.status(201).json({
          message: "User successfully created",
          token: token,
        });
      })
      .catch((error) => {
        console.log(error)
        res.status(400).json({
          message: error.message,
          error: error.message,
        })
      }
      );
  });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Login user
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Incorrect Login details",
        error: "User not found",
      });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign({ id: user._id, email }, jwtSecret, {
            expiresIn: maxAge, // 3hrs in sec
          });
          res.status(201).json({
            message: "User successfully Logged in",
            token: token,
          });
        } else {
          res.status(400).json({
            message: "Incorrect Login details",
            error: "User not found",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Get user
 */
exports.getUser = async (req, res) => {
  const { id } = req.user;
  try {
    const users = await User.findOne({ _id: id });
    if (users) {
      res.status(200).json({
        data: users,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
