const bcrypt = require('bcryptjs');

exports.generate = async function(password){
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log(err)
  }
}

exports.compare = async function(password,accPassword){
  try {
    return await bcrypt.compare(password, accPassword);
  } catch (err) {
    console.log(err)
  }
}