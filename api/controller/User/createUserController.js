const DAO = require("../../dataAccess/userDao");

module.exports = async (req,res) => {
  try {
    const user = req.body;

    const data = await DAO.createUser(user);

    res.status(201).json({created:data,message:"User Created",user});
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error")
  }
}