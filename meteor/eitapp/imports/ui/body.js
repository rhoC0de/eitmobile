import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Eits } from '../api/eits.js';

import './eit.js';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  eits() {
    return Eits.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .new-eit'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const firstname = target.firstname.value;
    const surname = target.surname.value;
    const gender = target.gender.value;
    const dob = target.dob.value;

    // Insert a task into the collection
    Eits.insert({
      firstname,
      surname,
      gender,
      dob,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.firstname.value = '';
    target.surname.value = '';
    target.gender.value = '';
    target.dob.value = '';
  },
  'change .delete input'(event, instance) {
    instance.state.set('delete', event.target.checked);
  },
});