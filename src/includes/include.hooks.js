/**
 * Implements hook_blocks_build_alter().
 */
function dg_modal_blocks_build_alter(blocks) {

  // Make sure the modal class lands on the block's div.
  // @TODO this might not be needed anymore.
  var classes = blocks.modal._attributes.class;
  if (!dg.inArray('modal', classes)) { classes.push('modal'); }

}

/**
 * Implements hook_pre_process_route_change().
 */
function dg_modal_pre_process_route_change(newPath, oldPath) {
  var stack = dg_modal.getStack();
  var id = null;
  if (stack.length) {
    while (stack.length) {
      id = stack.pop();
      if (dg_modal.isOpen(id)) { dg_modal.close(id); }
      dg_modal.delete(id);
    }
  }
  // Clear out any stragglers that aren't on the stack.
  var modals = dg._modals;
  for (id in modals) {
    if (!modals.hasOwnProperty(id)) { continue; }
    var modal = modals[id];
    if (modal.isOpen()) { modal.close(); }
    dg_modal.delete(id);
  }
}
