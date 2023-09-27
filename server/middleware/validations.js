const yup = require("yup");

//Signup validaton schema
const signUpSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    password: yup.string().min(6).max(32).required(),
    email: yup.string().email().required(),
  }),
});


//Login validaton schema
const loginSchema = yup.object({
  body: yup.object({
    password: yup.string().min(6).max(32).required(),
    email: yup.string().email().required(),
  }),
});

//Validatin method for body, params and query request type
const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

module.exports = { signUpSchema, validate, loginSchema };
