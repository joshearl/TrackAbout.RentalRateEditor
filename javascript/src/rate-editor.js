RateEditor = Backbone.View.extend({
  template: _.template($('#rate-editor-template').html(), this),

  initialize: function () {
    this.collection = this.createDemoData();
    this.collection.on('add', this.render);
    this.eventAggregator.on('tierSplit', this.tierSplit);
    this.render();
  },

  render: function() {
    this.$el.html(this.template);
    $('#rate-editor-container').append(this.$el);
    this.renderTiers();
    return this;
  },

  renderTiers: function() {
    var self = this,
        tiersEl = $('#tier-rows');

    tiersEl.html("");

    this.collection.each(function (tier) {
      tiersEl.append(new TierView({ model: tier }).render().el);
    });
  },

  events: {
    "click .done": "save",
    "change #rental-method-selector" : "onRentalMethodChanged"
  },

  tierSplit: function (model) {
    var index = this.collection.indexOf(model);
    this.collection.add(new Tier, { at: index + 1 });
  },

  // TODO this code is duplicated in tier-list-view.js
  save: function () {
    if (this.collection.isValid()) {
      // TODO save each model
      console.log("Collection saved");
      this.eventAggregator.trigger("ratesSaved");
      this.remove();
    } else {
      console.log("Invalid collection");
    }
  },

  onRentalMethodChanged: function () {
    var tierList = $('#tier-list'),
        rentalMethodSelector = $('#rental-method-selector option:selected');
    console.log(rentalMethodSelector.text());
    if (rentalMethodSelector.text() === "No Override") {
      tierList.addClass('hide');
    } else {
      tierList.removeClass('hide');
    }
  },

  createDemoData: function () {
    var demoCollection = new Tiers;
    demoCollection.add(new Tier({ minimum: 1, maximum: 10, price: '50' }));
    demoCollection.add(new Tier({ minimum: 11, maximum: 20, price: '50' }));
    demoCollection.add(new Tier({ minimum: 21, maximum: 30, price: '50' }));
    demoCollection.add(new Tier({ minimum: 31, maximum: 40, price: '50' }));
    demoCollection.add(new Tier({ minimum: 41, maximum: 'All', price: '50' }));
    return demoCollection;
  },
});
