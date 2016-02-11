import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':ab-select', 'multiselect'],
  isDropdown: false,
  selected: Ember.computed.filterBy('content', 'selected', true),
  contentSorting: ['selected:desc', 'label:asc'],
  orderedContent: Ember.computed.sort('content', 'contentSorting'),

  listenOutsideClick: Ember.on('didInsertElement', function() {
    var clickHandler = this.handleOutsideClick.bind(this);
    Ember.$(document).on('click', clickHandler);
  }),

  handleOutsideClick(e) {
    if (this.get('isDropdown')) {
      var element = this.get('element');
      var $target = $(e.target);
      if ($target.closest(element).length === 0) {
        this.set('isDropdown', false);
      }
    }
  },

  isShowDropdown: Ember.computed('isDropdown', 'content.[]', function() {
    return this.get('isDropdown') && this.get('content.length') > 0;
  }),

  valueAsString: Ember.computed('selected.[]', 'customText', function() {
    if (this.get('customText')) {
      return this.get('customText');
    }
    return this.get('multiselect') ? `${this.get('selected.length')} Countries Selected` : this.get('selected.firstObject.label');
  }),

  actions: {
    select(option) {
      this.set('isDropdown', false);
      if (this.get('multiselect')) {
        option.toggleProperty('selected');
      } else {
        this.get('content').setEach('selected', false);
        option.toggleProperty('selected');
      }
      if (this.get('action')) {
        this.sendAction('action', option.value);
      }
    },

    toggleDropDown() {
      this.toggleProperty('isDropdown');
    }
  }
});
