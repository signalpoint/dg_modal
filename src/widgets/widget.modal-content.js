dg.theme_modal_content = function(variables) {
  variables._attributes.class.push('modal-content');
  return '<div ' + dg.attrs(variables) + '>' + dg.render(variables._content) + '</div>';
};
