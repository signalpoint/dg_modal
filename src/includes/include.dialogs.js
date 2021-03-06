/**
 * @param {*} content
 * @param {Object} options Optional
 *   alertCallback - the function to call after the user presses OK
 *   title - {String} the title to use on the alert box, defaults to 'Alert'
 *   buttonName - {String} the text to place on the button, default to 'OK'
 *   _attributes {Object} A dg8 attributes object to be applied to the modal wrapper element.
 */
dg_modal.alert = function(content, options) {
  if (!options) { options = {}; }
  dg.attributesInit(options);
  var attrs = options._attributes;
  if (!dg.inArray('modal', attrs.class)) { attrs.class.push('modal'); }

  // What type of modal do we have? default, status, warning or error
  var type = options.type ? options.type : 'default';

  // Set up a header title depending on the type of alert.
  var titleMap = {
    default: 'Alert',
    status: 'Status',
    warning: 'Warning',
    error: 'Error'
  };
  var title = dg.t(titleMap[type] ? titleMap[type] : 'Alert');

  // Process any incoming options.
  var alertCallback = options.alertCallback ? options.alertCallback : null;
  if (typeof options.title !== 'undefined') { title = options.title; }
  var buttonName = null;
  if (typeof options._footer !== 'undefined' && !options._footer) { /* they don't want a footer */ }
  else { buttonName = options.buttonName ? options.buttonName : dg.t('OK'); }

  // Load up the modal, set it's alert callback and content, then open it.
  var modal = options.id ? dg_modal.load(options.id) : dg_modal.load();
  modal.setAttributes(attrs);
  modal.setAlertCallback(alertCallback);
  modal.setContent({
    _modal: modal,
    _attributes: { class: [type] },
    _title: title,
    _content: content,
    _footer: buttonName // @TODO, this should support an array of buttons, 1, 2, 3, etc.
  });
  modal.open();
};

// Make a helper proxy function called dg.modal() so developers don't have to type dg_modal.alert().
dg.modal = dg_modal.alert;

// Take over dg.alert() if it isn't enabled.
if (!dg.alert) { dg.alert = dg_modal.alert; }

/**
 *
 */
dg_modal.confirm = function(message, options) {

  // @TODO this should be a simple proxy to dg_modal.alert(), which should allow for multiple buttons in the footer.

};

// Make a helper proxy function called dg.modalConfirm() for consistency with dg.modal().
dg.modalConfirm = dg_modal.confirm;

// Take over dg.confirm() if it isn't enabled.
if (!dg.confirm) { dg.confirm = dg_modal.confirm; }
