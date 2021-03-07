"use strict";

const Converter = require("../controllers/converter.js");

module.exports = app => {
  
  var ConversionHandler = new Converter();

  app.get("/api/convert", (req, res) => {
    // Get necessary from request query
    let in_amount = req.query.amount;
    let in_unit = req.query.in_unit;
    let out_unit = req.query.out_unit;
    console.log(req.url);
    // Use methods from ConversionHandler to process data and show stringed result
    let in_unit_idx = ConversionHandler.getIndex(in_unit);
    let out_unit_idx = ConversionHandler.getIndex(out_unit);
    let result = ConversionHandler.getResult(in_unit_idx, out_unit_idx, in_amount);
    res.send(result);
    
  })
}