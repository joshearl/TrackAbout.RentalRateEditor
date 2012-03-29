Tiers = Backbone.Collection.extend({
  model: Tier,

  initialize: function () {
    this.on("change:minimum", this.onTierMinimumChanged);
    this.on("change:maximum", this.onTierMaximumChanged);
    this.on("remove", this.onTierRemoved);
  },
  
  onTierMinimumChanged: function (tier, value) {
    var previous = this.previous(tier);

    if (!_.isUndefined(previous)) {
      previous.set({ maximum: (value - 1) });
    }
  },

  onTierMaximumChanged: function (tier, value) {
    var next = this.next(tier);

    if (!_.isUndefined(next)) {
      next.set({ minimum: (parseInt(value) + 1) });
    }
  },
  
  onTierRemoved: function (tier, list, removed) {
    var previous = this.previous(tier),
        next = this.next(tier);

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
      var previous = this.previous(tier),
            next = this.next(tier);

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
    }, this);

    return valid;
  }
});
