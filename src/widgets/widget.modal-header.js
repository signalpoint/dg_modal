dg.theme_modal_header = function(variables) {
  variables._attributes.class.push('modal-header');
  return '<div ' + dg.attrs(variables) + '>' +
      '<span class="modal-close" onclick="dg_modal.close()">&times;</span>' +
      '<h2>' + variables._title + '</h2>' +
  '</div>';
};
