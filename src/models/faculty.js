import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema({
  facultyName: {
    type: String,
    require: true,
  },
  institute: {
    type: Schema.Types.ObjectId,
    ref: "Institute",
    require: true,
  },
  facultyEmail: {
    type: String,
    require: true,
  },
  facultyPassword: {
    type: String,
    require: true,
  },
});

const Faculty =
  mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);
export default Faculty;
