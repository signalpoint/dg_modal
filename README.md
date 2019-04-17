# dg_modal

A module for DrupalGap 8 to easily display modal windows.

Inspired by: https://www.w3schools.com/howto/howto_css_modals.asp


## settings.js

Add the `modal` block to one of your theme's regions in the `settings.js` file. We recommend adding it right before
the `messages` block in the `content` region of your theme, for example:

```
content: {

    // The modal block.
    modal: { },

    // DrupalGap's messages block.
    messages: { },
}
```

## Usage

Id you are using `dg_dialogs` module, then `dg_modal` does not set up a proxy for `dg.alert()`, so instead you have to
use the `dg.modal()`:

```
var msg = dg.t('Everything is OK.'); 
dg.modal(msg);
```

### Dialog replacement

If you're *not* using the `dg_dialogs` module, then you can use `dg.alert()` for modals:

```
var msg = dg.t('Everything is OK.'); 
dg.alert(msg);
```

## Options

## id

Use a unique `id` if you'd need to be able to open multiple modal at once. It defaults to `modal` if one wasn't
provided.

```
var msg = dg.t('I am a human, not an id number!');
dg.modal(msg, {
  id: 'my-custom-modal'
});
```

### type

Use `type` to specify what kind of modal will be shown:

- `default`
- `status`
- `warning`
- `error`

```
var msg = dg.t('The robots are coming.'); 
dg.modal(msg, {
  type: 'warning'
});
```

You can provide a custom string for `type` if you want, and it will be used as a CSS class name on the wrapper. See the
 `_attributes` section below for more about custom classes and attributes.

### title

Use the `title` to set the text that appears in the header, or `null` to use no text:

```
var msg = dg.t('Do you want one?'); 
dg.modal(msg, {
  title: dg.t('Bitcoin')
});
```

### alertCallback

Use the `alertCallback` to do something after the user closes the dialog:

```
var msg = dg.t('Sarcasm detector disabled.');
dg.modal(msg, {
  type: 'error',
  alertCallback: function(button) {
  
      sarcasmDetector.enable();
  
  }
});
```

### buttonName

Use `buttonName` to specify the text shown on the button in the footer of the modal.

```
var msg = dg.t('Something amazing happened.');
dg.modal(msg, {
  buttonName: dg.t('Continue')
});
```

### _attributes

Use `_attributes` to specify any custom attributes you'd like added to the modal div.

```
var msg = dg.t('Look at my hot attributes.');
dg.modal(msg, {
  id: 'my-custom-modal',
  buttonName: dg.t('Continue'),
  _attributes: {
    class: ['foo', 'bar'],
    id: 'my-custom-modal'
  }
});
```

You *must* use a unique `id` for this to work, it will not work with the default `modal` id. If you need to modify the
attributes on the `modal` block, use `hook_blocks_build_alter()` instead.

### _footer

Set `_footer` to false to not render a footer with the modal:

```
dg.modal('Hello', {
  _footer: false,
});
```

## Hooks

```
/**
 * Implements hook_modal_open().
 */
function example_modal_open(modal) {

  // Do something when our custom modal is opened.
  if (modal.id() == 'my-custom-modal') {
    doSomething();
  }

  // Do something else when any modal is opened.
  doSomethingElse();

}

/**
 * Implements hook_modal_close().
 */
function example_modal_close(modal) {

  // Do something when our custom modal is closed.
  if (modal.id() == 'my-custom-modal') {
    doSomething();
  }

  // Do something when any modal is closed.
  doSomethingElse();

}
```

## Examples

### Load a form in a modal

```
var element = {};
element.controls = {
  _theme: 'form',
  _id: 'MyCustomForm'
};
dg.modal(element);
```

### Programmatically open modal

```
dg_modal.load('my-custom-modal').open();
```

### Programmatically close modal

```
dg_modal.close(); // Closes all modals.
dg_modal.close('my-custom-modal'); // Close a certain modal.
```

### Check if modal is open

```
if (dg_modal.isOpen()) {
  // At least one modal is open.
}
else if (dg_modal.isOpen('my-custom-modal')) {
  // My custom modal is open.
}
```
