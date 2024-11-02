const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
    
  },
  contactNumber: {
    type: Number,
   
  },
  departmentName: {
    type: String,
  },
  cityName: {
    type: String,
  },
  branchName: {
    type: String,
  },
  enrollmentNumber: {
    type: String,
  },
  year: {
    type: Number,
  },
  collegeName: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
