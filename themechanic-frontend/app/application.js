import RouteController from 'route-controller';
import MechanicModeToggle from 'views/sign-in-button';

const AuthorizationPlaceholder = Backbone.Model.extend({
  mechanicMode: false,
  
  toggle: function() {
    this.set('mechanicMode', !this.get('mechanicMode'));
  }
});

export default Mn.Application.extend({
  region: 'main.container',
  
  onStart: function() {
    this.authorizationPlaceholder = new AuthorizationPlaceholder();
    
    let mechanicModeToggle = new MechanicModeToggle({application:  this});
    
    mechanicModeToggle.render();
  
    let controller = new RouteController({application: this});
    
    let router = new Mn.AppRouter({
      controller: controller,
      
      appRoutes: {
        '': 'dashboard',
        'mechanic-dashboard': 'mechanicDashboard',
        'create-order': 'createOrder'
      }
    });
    
    Backbone.history.start();
  },
  
  isAuthorized: function() {
    return this.authorizationPlaceholder.get('mechanicMode');
  },
  
  signInPopup: function(options) {
    let popoverOptions = $.extend({
      title: 'Sign in required',
      placement: 'bottom',
      trigger: 'focus'
    }, options);
    
    popoverOptions.content += ' You can sign in here.';
    
    $('#mechanic-mode-toggle')
    .popover(popoverOptions)
    .on('hidden.bs.popover', function() {
      $(this).popover('dispose');
    });
    
    $('#mechanic-mode-toggle a').focus();
  }
});
