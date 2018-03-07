dg.createModule('dg_modal');

dg._modal = null; // Holds onto the global DgModal class instance. // @TODO deprecate this one, we support multiple now.
dg._modals = {}; // Holds onto the global DgModal class instances, keyed by id.

// STACK
dg_modal._stack = [];
dg_modal.getStack = function() { return dg_modal._stack; };
dg_modal.stackPush = function(id) { dg_modal.getStack().push(id); };
dg_modal.stackPop = function() { return dg_modal.getStack().pop(); };
