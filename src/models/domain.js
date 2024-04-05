import mongoose, { Schema } from "mongoose";

const domainSchema = new Schema({
  domainName: {
    type: String,
    require: true,
  },
  domainProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const Domain = mongoose.models.Domain || mongoose.model("Domain", domainSchema);
export default Domain;
