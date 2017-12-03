dg.theme_modal_footer = function(variables) {
  variables._attributes.class.push('modal-footer');
  return '<div ' + dg.attrs(variables) + '>' +
      dg.b(variables._title, {
        _attributes: {
          onclick: 'dg_modal.close()'
        }
      }) + '</div>';
};
