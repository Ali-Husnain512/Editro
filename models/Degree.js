const { model, Schema } = require("mongoose")

const DegreeSchema = new Schema({
  rollNo: {
    type: String,
    required: true,
  },
  obtainNo: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
  },
  institute: {
    type: String,
  },
})

module.exports = model("degrees", DegreeSchema)
