const {string, number, object} = require('yup');

let userSchema = object({
  name: string().required().trim(),
  phoneNumber: number().required().integer().min(10).max(10),
  emailId: string().required().email().trim(),
  age: number().required().positive(),
})

module.exports = userSchema;