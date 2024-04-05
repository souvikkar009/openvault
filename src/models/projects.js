import mongoose, { Schema } from "mongoose";

const projectSchemea = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    projectBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
    },
    instituteName: {
      type: String,
      require: true,
    },
    domainId: {
      type: Schema.Types.ObjectId,
      ref: "Domain",
    },
    domainName: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchemea);
export default Project;
