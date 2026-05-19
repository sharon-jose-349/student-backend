require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  department: String,
  year: String
});

// Model
const Student = mongoose.model("Student", studentSchema);

// Home Route
app.get("/", (req, res) => {
  res.send("Server Running 1");
});

// Add Student
app.post("/addstudent", async (req, res) => {
  try {
    console.log(req.body);
    const student = new Student(req.body);
    await student.save();
    res.status(200).json({
      message: "Student Added "
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

// Get All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch(error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

// Delete Student
app.delete("/deletestudent/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Student Deleted"
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started");
});