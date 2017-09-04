const SignInButtonModel = Backbone.Model.extend({
  defaults: {
    icon: 'in',
    linkState: '',
    href: '#mechanic-dashboard'
  }
});

export default Mn.View.extend({
  el: '#mechanic-mode-toggle',
  
  initialize: function(options) {
    $.extend(this, options);
    
    this.application.authorizationPlaceholder.on('change:mechanicMode', this.onModeChange, this);
    
    this.model = new SignInButtonModel();
  },
  
  onModeChange: function() {    
    let authorized = this.application.isAuthorized();
    
    this.model.set({
      icon:      authorized ? 'out'    : 'in',
      linkState: authorized ? 'active' : '',
      href:      authorized ? '#'      : '#mechanic-dashboard'
    });
  },
  
  template: require('templates/sign-in-button'),
  
  events: { 'click a': 'toggleOnClick' },
  
  modelEvents: { 'change': 'render' },
  
  toggleOnClick: function(event) {
    this.application.authorizationPlaceholder.toggle();
  }
});
