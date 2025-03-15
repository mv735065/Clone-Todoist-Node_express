let User = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    if (!req.body || req.body.length == 0 || Object.keys(req.body) == 0) {
      throw new Error("Send the user data");
    }

    let user = await User.create(req.body);

    res.status(201).send({message:user});
  } catch (err) {
    res.status(403).send({message:"Unable to create user" + err.message});
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let user = await User.getAllUsers();
    res.status(201).send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.getUserById = async function (req, res) {
  try {
    let id = req.params.id;
     
    if (isNaN(id)) {
      throw new Error("Send the id as number");
    }
    let user = await User.getUserById(id);
    if(user.length==0) {
      throw new Error("User with given Id not exists");
    }
    res.status(201).send(user);
  } catch (err) {
    res.status(404).send({ message:err.message,});
  }
};

exports.deleteUserById = async function (req, res) {
  try {
    let id = req.params.id;

    if (isNaN(id)) {
      throw new Error("Send the id as number" );
    }
    let user = await User.deleteUserById(id);
    res.status(201).send(user);
  } catch (err) {
    res.status(404).send({ message:err.message,});
  }
};

exports.deleteAllUsers = async function (req, res) {
  try {
    const getRes = await User.deleteAllUsers();
    res.status(200).send(getRes);
  } catch (err) {
    return res.status(400).send("Unable to delete all users" + err.message);
  }
};
