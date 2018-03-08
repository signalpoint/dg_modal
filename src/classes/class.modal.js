DgModal = function(id) {

  // By default we go for the "modal" block which is always in the DOM. However, if a custom ID is provided we'll create
  // a block on the fly and insert it after the top most modal block as a way to house this new unique modal. This
  // allows multiple modals to be open at once, and they will keep piling on top of eachother.
  var block = dg.qs('#' + id);
  if (!block) {
    block = document.createElement('div');
    block.setAttribute('id', id);
    block.classList.add('modal'); // @TODO is this line needed anymore, I think it's taken care of elsewhere down the line.
    var stack = dg_modal.getStack();
    var idSelector = !stack.length ? 'modal' : stack[stack.length - 1];
    var ref = dg.qs('#' + idSelector);
    ref.parentNode.insertBefore(block, ref.nextSibling);
  }

  this._id = id;
  this._block = block; // Holds a reference to the modal block in the DOM.
  this._content = null; // Holds onto the content to be rendered in the modal.
  this._alertCallback = null; // Holds onto the callback function when the modal is closed.

};

DgModal.prototype.id = function() {
  return this._id;
};

DgModal.prototype.getBlock = function() {
  return this._block;
};

DgModal.prototype.setAttributes = function(attributes) {
  dg.addAttrs(this.getBlock(), {
    _attributes: attributes
  });
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
  dg_modal.stackPush(this.id());
  jDrupal.moduleInvokeAll('modal_open', this);
};

DgModal.prototype.close = function() {
  dg.hide(this.getBlock());
  var callback = this.getAlertCallback();
  callback ? callback() : null;
  dg_modal.stackPop();
  jDrupal.moduleInvokeAll('modal_close', this);
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
    var modal = dg_modal.loadRecent();
    if (modal.isOpen()) { modal.close(); }
  }
};

/**
 * Listens for clicks outside an open modal, then closes it.
 */
DgModal.prototype.onclick = function(event) {
  var modal = dg_modal.loadRecent();
  var block = modal.getBlock();
  if (event.target == block && modal.isOpen()) { modal.close(); }
};
