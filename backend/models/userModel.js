const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (username, email, password) {
  // validation
  if (!username || !email || !password) {
    throw Error("Please fill in all fields.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email adddress.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Please choose a more secure password. It should be at least 6 characters long and include a combination of uppercase and lowercase letters, numbers, and special characters."
    );
  }

  // Check for spaces in the username
  if (username.includes(" ")) {
    throw Error("Username cannot contain spaces.");
  }

  const existingUsername = await this.findOne({ username });
  const existingEmail = await this.findOne({ email });

  if (existingUsername) {
    throw new Error(
      " Username is already in use. Please select a different username for registration."
    );
  }

  if (existingEmail) {
    throw new Error(
      " Email address is already in use. Please choose a different email for registration."
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hashedPassword });

  return user;
};

// static login method
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("Please fill in all fields.");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("The username you’ve entered is incorrect.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("The password you’ve entered is incorrect.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
