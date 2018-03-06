dg.theme_modal_wrapper = function(variables) {
  variables._attributes.class.push('modal-wrapper');
  var html = '<div ' + dg.attrs(variables) + '>';

  html += dg.render({
    _theme: 'modal_header',
    _title: variables._title
  });

  if (variables._content) {
    html += dg.render({
      _theme: 'modal_content',
      _content: variables._content
    });
  }

  if (variables._footer) {
    html += dg.render({
      _theme: 'modal_footer',
      _title: variables._footer
    });
  }

  return html + '</div>';
};
