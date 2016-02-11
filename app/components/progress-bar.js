import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'dl',
  classNames: ['progress'],
  barStyle: Ember.computed('value', function() {
    return new Ember.Handlebars.SafeString(`width: ${this.get('value')}%`);
  })
});
