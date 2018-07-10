/**
 * Returns the modal object.
 * @returns {*}
 */
dg_modal.load = function(id) {
  if (!id) { id = 'modal'; }

  // If the modal already exists, return it.
  if (dg._modals[id]) { return dg._modals[id]; }

  // Instantiate the modal object and set it aside.
  var modal = new DgModal(id);
  dg._modals[id] = modal;

  // Attach listeners.
  window.addEventListener('keydown', modal.onkeydown, false); // Listen for escape key to close the modal.
  window.addEventListener('click', modal.onclick, false); // Listen for clicks outside modal to close it.

  // Return the loaded modal object.
  return modal;

};

dg_modal.loadRecent = function() {
  var stack = dg_modal.getStack();
  return dg_modal.load(stack.length ? stack[stack.length - 1] : 'modal');
};

dg_modal.delete = function(id) {
  if (id == 'modal') { return; } // We won't remove the default block.
  if (dg._modals[id]) {
    delete dg._modals[id];
    var modalEl = dg.qs('#' + id);
    if (modalEl) { modalEl.parentNode.removeChild(modalEl); }
  }
};

/**
 * Returns true if any modal is open, false otherwise.
 * @param id {String} Optional, a certain modal id.
 * @returns {boolean}
 */
dg_modal.isOpen = function(id) {
  if (id) { return dg_modal.load(id).isOpen(); }
  var modals = dg._modals;
  for (id in modals) {
    if (!modals.hasOwnProperty(id)) { continue; }
    var modal = modals[id];
    if (modal.isOpen()) { return true; }
  }
  return false;
};

/**
 * Closes all modals.
 * @param id {String} Optional, close a certain modal.
 */
dg_modal.close = function(id) {
  if (id) { dg_modal.load(id).close(); }
  else {
    var modals = dg._modals;
    for (id in modals) {
      if (!modals.hasOwnProperty(id)) { continue; }
      var modal = modals[id];
      modal.close();
    }
  }
};
