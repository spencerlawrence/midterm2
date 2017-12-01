var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Shop = mongoose.model('Shop');

router.post('/shopping', function(req,res,next) {
  var shop = new Shop(req.body);
  shop.save(function(err,shop) {
    if(err){return next(err);}
    res.json(shop);
  });
});

router.get('/shopping', function(req,res,next) {
  Shop.find(function(err, shop) {
    if(err) {return next(err);}
    res.json(shop);
  });
});

router.param('shop', function(req, res, next, id) {
  var query = Shop.findById(id);
  query.exec(function (err, shop){
    console.log("in param");
    if (err) { return next(err); }
    if (!shop) { return next(new Error("can't find shop")); }
    req.shop = shop;
    return next();
  });
});

router.get('/shopping/:shop', function(req,res) {
  res.json(req.shop);
});

router.put('/shopping/:shop/shop', function(req, res, next) {
  req.shop.shop(function(err, shop){
    if (err) { return next(err); }
    res.json(shop);
  });
});

router.delete('/shopping/:shop', function(req, res) {
  console.log("in Delete");
  req.shop.remove();
  res.sendStatus(200);
});

module.exports = router;
