DgModal = function() {
  this._block = dg.getBlockFromDom('modal'); // Holds a reference to the modal block in the DOM.
  this._content = null; // Holds onto the content to be rendered in the modal.
  this._alertCallback = null; // Holds onto the callback function when the modal is closed.
};

DgModal.prototype.getBlock = function() {
  return this._block;
};

DgModal.prototype.setAlertCallback = function(alertCallback) {
  this._alertCallback = alertCallback;
};
DgModal.prototype.getAlertCallback = function() {
  return this._alertCallback;
};

DgModal.prototype.isOpen = function() {
  return this.getBlock().style.display == 'block';
};
DgModal.prototype.open = function() {
  dg.show(this.getBlock());
};

DgModal.prototype.close = function() {
  dg.hide(this.getBlock());
  var callback = this.getAlertCallback();
  callback ? callback() : null;
};

/**
 *
 * @param variables
 *  _header {*}
 *  _content {*}
 *  _footer {*}
 */
DgModal.prototype.setContent = function(variables) {
  variables._theme = 'modal_wrapper';
  this.getBlock().innerHTML = dg.render(variables);
};

DgModal.prototype.clearContent = function() {
  this.getBlock().innerHTML = '';
};

/**
 * EVENT LISTENERS
 */

/**
 * Listens for the press of the escape key and then closes the modal window if it's open.
 */
DgModal.prototype.onkeydown = function(event) {
  event = event || window.event;
  var isEscape = false;
  if ("key" in event) {
    isEscape = (event.key == "Escape" || event.key == "Esc");
  } else {
    isEscape = (event.keyCode == 27);
  }
  if (isEscape) {
    var modal = dg_modal.load();
    if (modal.isOpen()) { modal.close(); }
  }
};

/**
 * Listens for clicks outside an open modal, then closes it.
 */
DgModal.prototype.onclick = function(event) {
  var modal = dg_modal.load();
  var block = modal.getBlock();
  if (event.target == block && modal.isOpen()) { modal.close(); }
};
