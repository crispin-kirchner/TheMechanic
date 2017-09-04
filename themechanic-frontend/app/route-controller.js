import LandingPageView from 'views/landing-page';
import MechanicLandingPageView from 'views/mechanic-landing-page';
import CreateNewOrderFormView from 'views/create-new-order-form';

export default Mn.Object.extend({
  initialize: function(options) {
    $.extend(this, options);
  },
  
  createOrder: function() {
    if(!this.application.isAuthorized()) {
      Backbone.history.navigate('#', {trigger: true, replace: true});
      
      this.application.signInPopup({
        content: 'Creating an order is only possible when you are signed in.'
      });
      
      return;
    }
    
    this.application.showView(new CreateNewOrderFormView());
  },
  
  dashboard: function() {
    if(this.application.isAuthorized()) {
      Backbone.history.navigate('#mechanic-dashboard', {trigger: true, replace: true});
      return;
    }
    
    this.application.showView(new LandingPageView());
  },
  
  mechanicDashboard: function() {
    if(!this.application.isAuthorized()) {
      Backbone.history.navigate('#', {trigger: true, replace: true});
      
      this.application.signInPopup({
        content: 'The mechanic dashboard is only accessible when you are signed in.'
      });
      
      return;
    }
    
    this.application.showView(new MechanicLandingPageView());
  }
});
