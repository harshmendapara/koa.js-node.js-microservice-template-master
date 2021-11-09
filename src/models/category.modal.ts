const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  childCategory: {
    type:Schema.Types.ObjectId,
    required: false,
    ref: "Categorie"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

export default mongoose.model('Categorie', categorieSchema);
