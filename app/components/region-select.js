import Ember from 'ember';
import Regions from 'apptopia/fixtures/regions';

export default Ember.Component.extend(Ember.Evented, {
  setup: Ember.on('init', function() {
    var regions = Ember.ArrayProxy.create({
      content: Regions.map(function(a) {
        return Ember.Object.create({
          label: a.label,
          value: a.value,
          selected: false
        });
      })
    });

    this.get('parentView').on('select::country', this, 'onCountrySelect');
    this.set('optionsList', regions);
    this._setDefaultValue();
  }),

  onCountrySelect: function() {
    this.set('customText', 'Custom');
  },

  willDestroy() {
    this.get('parentView').off('select::country', this, 'onCountrySelect');
  },

  _setDefaultValue() {
    Ember.run.later(this, function() {
      this.set('optionsList.firstObject.selected', true);
      this.get('parentView').trigger('select::region', this.get('optionsList.firstObject.value'));
    });
  },

  actions: {
    onSelect(item) {
      this.set('customText', undefined);
      this.get('parentView').trigger('select::region', item);
    }
  }
});
