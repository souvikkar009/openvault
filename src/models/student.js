import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  studentName: {
    type: String,
    require: true,
  },
  instituteName: {
    type: String,
    require: true,
  },
  instituteId: {
    type: Schema.Types.ObjectId,
    ref: "Institute",
    require: true,
  },
  studentEmail: {
    type: String,
    require: true,
  },
  studentPassword: {
    type: String,
    require: true,
  },
  studentProject: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
export default Student;
