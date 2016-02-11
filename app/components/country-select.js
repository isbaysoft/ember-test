import Ember from 'ember';
import Regions from 'apptopia/fixtures/regions';
import Countries from 'apptopia/fixtures/countries';

export default Ember.Component.extend(Ember.Evented, {
  setup: Ember.on('init', function() {
    this.get('parentView').on('select::region', this, '_setOptionsList');
  }),

  willDestroy() {
    this.get('parentView').off('select::country', this, 'onCountrySelect');
  },

  _setOptionsList(regionValue) {
    var region = Regions.findBy('value', regionValue);
    let _countries = Countries.filter(function(a) {
      return region.countries.contains(a.value);
    });
    var countries = Ember.ArrayProxy.create({
      content: _countries.map(function(a) {
        return Ember.Object.create({
          label: a.label,
          value: a.value,
          selected: false
        });
      })
    });

    this.set('optionsList', countries);
    this._setDefaultValue();
  },


  _setDefaultValue() {
    Ember.run.later(this, function() {
      this.get('optionsList').slice(0,9).setEach('selected', true);
    });
  },

  actions: {
    onSelect() {
      this.get('parentView').trigger('select::country');
    }
  }
});
