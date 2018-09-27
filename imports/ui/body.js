import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Eits } from '../api/eits.js';
import {arr} from '../api/const.js'; 

import './eit.js';
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
      if(arr.length){
        Eits.update({_id: arr[0]},{
            firstname,
            surname,
            gender,
            dob,
            createdAt: new Date(), // current time
        });
        arr.length = 0;
      }
      else{
        Eits.insert({
            firstname,
            surname,
            gender,
            dob,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
      }
   
      // Clear form
    target.firstname.value = '';
    target.surname.value = '';
    target.gender.value = '';
    target.dob.value = '';
    },
  });

  Template.body.events({
    'click .delete'() {
      //Find checked eits
        Eits.find({checked: true}).forEach(function(eit){
          //Remove checked eits
          Eits.remove(eit._id);
        });
      }    
    });