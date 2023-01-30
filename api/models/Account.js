const {string, number, object} = require('yup');

let AccountSchema = object({
  userId: string().required(),
  money: number().required().min(0),
  accountNumber: number().positive().required().integer(),
  password: string().required().ensure().min(10).max(16)
})

module.exports = AccountSchema;