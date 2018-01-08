dg_modal.blocks = function() {
  var blocks = {};
  blocks['modal'] = {
    build: function () {
      return new Promise(function(ok, err) {
        ok({
          modal: {
            _markup: ''
          }
        });
      });
    }
  };
  return blocks;
};
