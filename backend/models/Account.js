const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const schema = new Schema({
  // firstname: { type: String, required: firstNameAndLastNameValidation },
  // lastname: { type: String, required: firstNameAndLastNameValidation },
  // rollno: { type: String, required: rollNoValidation },
  // qualification: { type: String, required: qualificationValidation },
  // department: { type: String, required: departmentValidation },
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  avatar: String,
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "student", "teacher"] },
  createdAt: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});

//-------------------------------------------------------------------------------------------------------------
// function firstNameAndLastNameValidation() {
//   return this.role === "admin" ? false : true;
// }
// function rollNoValidation() {
//   return this.role === "student" ? true : false;
// }
// function qualificationValidation() {
//   return this.role === "teacher" ? true : false;
// }
// function departmentValidation() {
//   return this.role === "teacher" ? true : false;
// }
// schema.pre("save", async function (next) {
//   console.log(this)
//   const user = this;
//   if (!user.isModified("password")) return next();
//   user.password = await bcrypt.hash(user.password, 12);
//   next();
// });
//-------------------------------------------------------------------------------------------------------------
// schema.methods.confirmPassword = async function (
//   candidatePassword,
//   savePassword
// ) {
//   return await bcrypt.compare(candidatePassword, savePassword);
// };
// //-------------------------------------------------------------------------------------------------------------
// // generating auth token
// schema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign(
//     {
//       id: user._id + "",
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "10 days",
//     }
//   );
//   return token;
// };

// //-------------------------------------------------------------------------------------------------------------
// schema.statics.findByCredentials = async (username, password) => {
//   const user = await AccountModel.findOne({
//     username,
//   });
//   if (!user) {
//     throw new Error("Invalid username or password");
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Invalid username or password");
//   }
//   user.password = undefined;
//   return user;
// };
//-------------------------------------------------------------------------------------------------------------

const AccountModel = mongoose.model("Account", schema);
module.exports = AccountModel;
