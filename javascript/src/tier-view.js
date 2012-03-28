TierView = Backbone.View.extend({
  tagName: 'li',
  className: 'tier-row',
  template: _.template($('#tier-template').html()),
  initialize: function () {
    this.model.bind('destroy', this.remove, this);
    this.model.bind('change', this.render, this);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  events: {
    "click .delete-tier": "deleteTier",
    "click .split-tier": "onSplitTierClicked",
    "change" : "updateTier"
  },

  deleteTier: function (event) {
    this.model.destroy();
  },

  onSplitTierClicked: function (event) {
    this.eventAggregator.trigger("tierSplit", this.model);
  },

  updateTier: function (event) {
    this.model.set({
      minimum: this.$('.tier-minimum').val(),
      maximum: this.$('.tier-maximum').val(),
      price: this.$('.tier-price').val()
    });
  },
});