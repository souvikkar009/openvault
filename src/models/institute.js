import mongoose, { Schema } from "mongoose";

const instituteSchema = new Schema({
  instituteName: {
    type: String,
    require: true,
  },
  // instituteProjects: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Project",
  //   },
  // ],
  // instituteFaculty: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Faculty",
  //   },
  // ],
});

const Institute =
  mongoose.models.Institute || mongoose.model("Institute", instituteSchema);
export default Institute;
