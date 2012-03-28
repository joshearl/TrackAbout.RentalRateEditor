Backbone.NeighborlyCollection = Backbone.Collection.extend ({

  add : function (model, options) {

    if (!_.isUndefined(options) && !_.isUndefined(options.at)) {
      model.set({
        nextNeighbor: this.models[options.at],
        previousNeighbor: this.models[options.at -1]
      });
    } else {
      model.set({
        previousNeighbor: _.last(this.models),
        nextNeighbor: undefined 
      });
    }

    Backbone.Collection.prototype.add.call(this, model, options);

    var index = _.indexOf(this.models, model);

    if (index > 0) {
      this.models[index - 1].set({ nextNeighbor: model });
    }
  },

  remove: function (model, options) {
    var preceedingModel = model.get('previousNeighbor');
    var nextModel = model.get('nextNeighbor');
    Backbone.Collection.prototype.remove.call(this, model, options);
    preceedingModel.set({ nextNeighbor: nextModel });
    nextModel.set({ previousNeighbor: preceedingModel });
  }
});
