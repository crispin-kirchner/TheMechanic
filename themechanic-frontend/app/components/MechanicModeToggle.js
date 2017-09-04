const MechanicModeToggleModel = Backbone.Model.extend({
  defaults: {
    icon: 'in',
    linkState: '',
    href: '#mechanic-dashboard'
  }
});

export default Mn.View.extend({
  el: '#mechanic-mode-toggle',
  
  initialize: function(args) {
    this.MECHANIC_MODE = args.MECHANIC_MODE;
    
    this.MECHANIC_MODE.on('change:mechanicMode', this.onModeChange, this);
    this.model = new MechanicModeToggleModel();
  },
  
  onModeChange: function() {    
    let mode = this.MECHANIC_MODE.get('mechanicMode');
    
    this.model.set({
      icon:      mode ? 'out' : 'in',
      linkState: mode ? 'active' : '',
      href:      mode ? '#' : '#mechanic-dashboard'
    });
  },
  
  template: require('templates/mechanic-mode-toggle'),
  
  events: { 'click a': 'toggleOnClick' },
  
  modelEvents: { 'change': 'render' },
  
  toggleOnClick: function(event) {
    this.MECHANIC_MODE.toggle();
  }
});
