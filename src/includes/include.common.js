/**
 * Returns the modal object.
 * @returns {*}
 */
dg_modal.load = function() {

  // If the modal has already been loaded, use it.
  var loaded = !! dg._modal;
  if (loaded) { return dg._modal; }

  // Instantiate the modal object and set it aside.
  var modal = new DgModal();
  dg._modal = modal;

  // Attach listeners.
  window.addEventListener('keydown', modal.onkeydown, false); // Listen for escape key.to close the modal.
  window.addEventListener('click', modal.onclick, false); // Listen for clicks outside modal to close it.

  // Return the loaded modal object.
  return modal;

};

/**
 * Closes the modal.
 */
dg_modal.close = function() {
  dg_modal.load().close();
};
