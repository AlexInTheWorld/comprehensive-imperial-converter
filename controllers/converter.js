module.exports = class ConversionHandler {
  constructor() {
    this.units = {
      "00,km,01,mi,02,ft,03,m,04,cm,05,in,06,yd,07,ac,08,sqm,09,pt,10,gal,11,l,12,oz,13,lb,14,kg,15,g,": [["kilometres", 0.001, "length"], ["miles", 0.00062137, "length"],
                                                          ["feet", 3.28084, "length"], ["metres", 1, "length"], ["centimetres", 1000, "length"],
                                                          ["inches", 39.37, "length"], ["yards", 1.0936133, "length"], ["acres", 0.0002471, "area"],
                                                          ["square metres", 1, "area"], ["pint", 1.759754, "volume"], ["gallons", 0.21997, "volume"],
                                                          ["litres", 1, "volume"], ["ounces", 35.27396, "weight"], ["pounds", 2.2046226, "weight"],
                                                          ["kilograms", 1, "weight"], ["grams", 1000, "weight"]]
    };
  }
  
  getIndex(unit_str) {
      let units_obj_key = Object.keys(this.units)[0];
      let u_idx = units_obj_key.search("," + unit_str + ",");
      if (u_idx != -1) {
        u_idx = units_obj_key.slice(Number(u_idx - 2), Number(u_idx));
      } else {
        u_idx = NaN;
      }
      return u_idx;
  }
  
  getResult(in_index, out_index, amount) {
      let key = Object.keys(this.units)[0];
      let num_result, str_result;

      if (in_index && out_index) {
        let out_idx = Number(out_index);
        let in_idx = Number(in_index);
        if (this.units[key][out_idx][2] === this.units[key][in_idx][2]) {
          num_result = Number(amount) * this.units[key][out_idx][1] / this.units[key][in_idx][1];
          str_result = Number(amount) + " " + this.units[key][in_idx][0] + " equal " + num_result + " " + this.units[key][out_idx][0];
        } else {
          str_result = "Incompatible units";
        }       
      } else {
        str_result = "Invalid units"
      }
    
      return str_result;
  }
}