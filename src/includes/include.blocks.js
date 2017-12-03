dg_modal.blocks = function() {
  var blocks = {};

  blocks['modal'] = {
    build: function () {
      return new Promise(function(ok, err) {
        var element = {};
        element.modal = {
          _markup: ''
        };
        ok(element);
      });
    }
  };

  return blocks;
};
