const { model, Schema } = require("mongoose")

const userImageSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = model("userImages", userImageSchema)

// module.exports = mongoose.model('users',UserSchema);
