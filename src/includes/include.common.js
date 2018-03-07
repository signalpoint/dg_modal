/**
 * Returns the modal object.
 * @returns {*}
 */
dg_modal.load = function(id) {
  if (!id) { id = 'modal'; }

  // If the modal has already been loaded, use it.
  // @TODO this doesn't work, it prevents a modal from being loaded a second time.
  //var loaded = !! dg._modal;
  //if (loaded) { return dg._modal; }

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
  if (dg._modals[id]) { delete dg._modals[id]; }
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
