Tier = Backbone.Model.extend({
  minimum : null,
  maximum: null,
  price: null,
  validate: function (attrs, options) {
    var min = attrs.minimum,
        max = attrs.maximum,
        price = attrs.price,
        parsedMin = parseInt(min),
        parsedMax = parseInt(max);

    // TODO fix flaw in logic. Had assumed that all attributes would be passed, but attrs only
    // includes value(s) that are changing

    if ((!_.isNumber(parsedMax) || _.isNaN(parsedMax)) && max != "All") {
      console.log("Max is invalid");
      return 'Maximum value must be a number or the word "All".';
    }

    if (!_.isNumber(parsedMin) || _.isNaN(parsedMin)) {
      console.log("Min is invalid");
      return 'Minimum value must be a number.';
    }

    if (max < min) {
      console.log("Minimum must be less than maximum.");
      return 'Minimum must be less than the maximum.';
    }

    if (_.isNull(price) || _.isUndefined(price) || _.isEmpty(price)) {
      console.log("Price is invalid");
      return 'Price is required.';
    }
  }
});