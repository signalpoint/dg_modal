/**
 * Implements hook_blocks_build_alter().
 */
function dg_modal_blocks_build_alter(blocks) {
  var classes = blocks.modal._attributes.class;
  if (!dg.inArray('modal', classes)) { classes.push('modal'); }
}
