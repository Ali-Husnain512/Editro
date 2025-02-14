const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema(
{
    image: String
},
{
    collection: "Image"
}
);

module.exports = mongoose.model('Image', imageSchema)