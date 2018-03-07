dg.theme_modal_header = function(variables) {
  variables._attributes.class.push('modal-header');
  var html = '<div ' + dg.attrs(variables) + '>' +
      '<span class="modal-close" onclick="dg_modal.close(\'' + variables._modal.id() + '\')">&times;</span>';
      if (variables._title) { html += '<h2>' + variables._title + '</h2>'; }
  html += '</div>';
  return html;
};
