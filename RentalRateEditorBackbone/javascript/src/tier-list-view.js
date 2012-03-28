TierListView = Backbone.View.extend({

  initialize: function () {
    _.bindAll(this);
    this.collection = new Tiers;
    this.collection.add(new Tier({ minimum: 1, maximum: 10, price: '50' }));
    this.collection.add(new Tier({ minimum: 11, maximum: 20, price: '50' }));
    this.collection.add(new Tier({ minimum: 21, maximum: 30, price: '50' }));
    this.collection.add(new Tier({ minimum: 31, maximum: 40, price: '50' }));
    this.collection.add(new Tier({ minimum: 41, maximum: 'All', price: '50' }));

    this.collection.bind('add', this.render);
  },

  render: function () {
    this.$el = $('#tier-rows');
    console.log(this.$el);
    this.$el.html("");
    var self = this;
    this.collection.each(function (tier) {
      self.$el.append(new TierView({ model: tier }).render().el);
    });
    return this;
  },

  save: function () {
    if (this.collection.isValid()) {
      // TODO save each model
      console.log("Collection saved");
    } else {
      console.log("Invalid collection");
    }
  },
});