import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['disabled', 'option.selected:selected'],

  disabled: Ember.computed('value.[]', function() {
    return (this.get('disableable')) && ((this.get('selected').length <= 2 && this.get('option.selected')) || (this.get('selected').length >= 15 && !this.get('option.selected')));
  }),

  click() {
    if (!this.get('disabled') && this.get('action')) {
      this.sendAction('action', this.get('option'));
    }
  }
});
