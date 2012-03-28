Tiers = Backbone.NeighborlyCollection.extend({
  model: Tier,

  initialize: function () {
    this.on("change:minimum", this.onTierMinimumChanged);
    this.on("change:maximum", this.onTierMaximumChanged);
    this.on("remove", this.onTierRemoved);
  },
  
  onTierMinimumChanged: function (tier, value) {
    tier.get('previousNeighbor').set({ maximum: (value - 1) });
  },

  onTierMaximumChanged: function (tier, value) {
    var next = tier.get('nextNeighbor');

    if (!_.isUndefined(next)) {
      next.set({ minimum: (parseInt(value) + 1) });
    }
  },
  
  onTierRemoved: function (tier, list, removed) {
    var next = tier.get('nextNeighbor'),
          previous = tier.get('previousNeighbor');

    next.set({ minimum: (previous.get('maximum') + 1) });
  },

  isValid: function () {
    var tiers = this.models,
        first = _.first(tiers),
        last = _.last(tiers)
        valid = true;

    if (_.isEmpty(tiers)) {
      valid = false;
    }

    if (first.get('minimum') > 1) {
      valid = false;
    }

    if (last.get('maximum') != 'All') {
      valid = false;
    }

    this.each(function (tier) {
      var previous = tier.get('previousNeighbor'),
            next = tier.get('nextNeighbor');

      if (!tier.isValid()) {
        valid = false;
      }

      if (!_.isUndefined(previous)) {
        if ((tier.get('minimum') - previous.get('maximum')) > 1) {
          valid = false;
        }
      }

      if (!_.isUndefined(next)) {
        if ((next.get('minimum') > tier.get('maximum')) > 1) {
          valid = false;
        }
      }
    });

    return valid;
  }
});
