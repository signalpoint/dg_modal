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
function dg_modal_post_process_route_change(route, newPath, oldPath) {
  var stack = dg_modal.getStack();
  if (stack.length) {
    while (stack.length) {
      var id = stack.pop();
      dg_modal.delete(id);
    }
  }
  // Clear out any stragglers that aren't on the stack.
  var modals = dg._modals;
  for (var id in modals) {
    if (!modals.hasOwnProperty(id)) { continue; }
    dg_modal.delete(id);
  }
}
