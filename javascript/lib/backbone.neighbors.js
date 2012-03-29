Backbone.Collection.prototype.previous = function (model) {
  var index = _.indexOf(this.models, model);
  return this.models[index - 1];
};

Backbone.Collection.prototype.next = function (model) {
  var index = _.indexOf(this.models, model);
  return this.models[index + 1];
};
