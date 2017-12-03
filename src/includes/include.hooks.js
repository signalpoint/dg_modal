/**
 * Implements hook_blocks_build_alter().
 */
function dg_modal_blocks_build_alter(blocks) {
  blocks.modal._attributes.class.push('modal');
}
