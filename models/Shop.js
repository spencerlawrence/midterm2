var mongoose = require('mongoose');
var ShopSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: {type: Number, default: 0},
  image: String
});
ShopSchema.methods.shop = function(cb) {
  this.quantity += 1;
  this.save(cb);
};
mongoose.model('Shop', ShopSchema);
