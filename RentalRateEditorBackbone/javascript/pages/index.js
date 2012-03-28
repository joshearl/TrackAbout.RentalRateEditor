$(function () {

  var rateEditor,
      popup;

  $('.edit-link').click(function (event) {
    event.preventDefault();

    popup = $('#rate-editor-container');
    rateEditor = new RateEditor;
    rateEditor.eventAggregator.bind('ratesSaved', function () {
      popup.bPopup().close();
    });

    popup.bPopup();
  });

});