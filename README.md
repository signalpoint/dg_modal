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

## Recommended usage

If you're *not* using the `dg_dialogs` module, then you can use `dg.alert()` for modals:

``` 
var msg = dg.t('Everything is OK.'); 
dg.alert(msg)
```
```

### Direct usage

Id you are using `dg_dialogs` module, then `dg_modal` does not set up a proxy for `dg.alert()`, so instead you have to
use the `dg_modal.alert()`:

```
var msg = dg.t('Everything is OK.'); 
dg.alert(msg)
```

## Options

Use `type` to specify what kind of modal will be shown:

### `type`

- `status` (default)
- `warning`
- `error`

```
var msg = dg.t('The robots are coming.'); 
dg.alert(msg, {
  type: 'warning'
});
```

### `title`

Use the `title` to set the text that appears in the header:

```
var msg = dg.t('Do you want one??'); 
dg.alert(msg, {
  title: dg.t('Bitcoin')
});
```

### `alertCallback`

Use the `alertCallback` to do something after the user closes the dialog:

```
var msg = dg.t('Sarcasm detector disabled.');
dg.alert(msg, {
  type: 'error',
  alertCallback: function(button) {
  
      sarcasmDetector.enable();
  
  }
});
```

### `buttonName`

Use `buttonName` to specify the text shown on the button in the footer of the modal.

```
var msg = dg.t('Something amazing happened.');
dg.alert(msg, {
  buttonName: dg.t('Continue')
});
```
