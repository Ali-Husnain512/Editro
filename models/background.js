const { model, Schema } = require("mongoose")

const backgroundImageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = model("backgroundImages", backgroundImageSchema)

// module.exports = mongoose.model('users',UserSchema);
