const { model, Schema } = require("mongoose")

const designImageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = model("designImages", designImageSchema)

// module.exports = mongoose.model('users',UserSchema);
