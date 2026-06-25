const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("../models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const admin =
    await User.findOne({
      email: "admin@gmail.com"
    });

  if (!admin) {
    const hashed =
      await bcrypt.hash("1234", 10);

    await User.create({
      name: "Administrator",
      email: "admin@gmail.com",
      password: hashed,
      role: "admin"
    });

    console.log(
      "Default Admin Created"
    );
  } else {
    console.log(
      "Admin Already Exists"
    );
  }

  process.exit();
};

createAdmin();