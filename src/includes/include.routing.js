dg_modal.routing = function() {
  var routes = {};

  routes['dg_modal.foo'] = {
    path: '/hello-world',
    defaults: {
      _title: 'Hello World',
      _controller: dg_modal.helloWorldController
    }
  };

  return routes;
};
