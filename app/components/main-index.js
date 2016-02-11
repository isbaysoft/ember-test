import Ember from 'ember';
import Data from 'apptopia/fixtures/data';

export default Ember.Component.extend({
  classNames: ['container'],

  content: Ember.computed(function() {
    return Data;
  })
});
