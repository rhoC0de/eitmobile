
import { Template } from 'meteor/templating';
 
import { Eits } from '../api/eits.js';

import './task.js';
import './body.html';
 
Template.body.helpers({
    eits() {
       // Show newest tasks at the top
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
  });