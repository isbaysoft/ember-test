import Ember from 'ember';

export function helper(params) {
  console.log('in;', params[0]);
  console.log('in;', params[1]);
  console.log('in;', params[0].contains(params[1]));
  return params[0].contains(params[1]);
}

export default Ember.Helper.helper(helper);
