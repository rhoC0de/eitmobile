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
    const eitData = {
      firstname: target.firstname.value,
      surname: target.surname.value,
      gender: target.gender.value,
      dob: target.dob.value,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    }
   
      // Insert a task into the collection
      // if(arr.length){
      //   Eits.update({_id: arr[0]},{
      //       firstname,
      //       surname,
      //       gender,
      //       dob,
      //       createdAt: new Date(), // current time
      //   });
      //   arr.length = 0;
      // }
      // else{
      //   Eits.insert({
      //       firstname,
      //       surname,
      //       gender,
      //       dob,
      //       createdAt: new Date(), // current time
      //       owner: Meteor.userId(),
      //       username: Meteor.user().username,
      //   });
      // }
      // var eitData=[firstname,surname,gender,dob,createdAt,owner,username,];
      Meteor.call('eits.insert',eitData);
   
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
        //  Meteor.call('eits.find',eitData);
          //Remove checked eits
          // Eits.remove(Eits._id);
          const eitId = eit._id
          Meteor.call('eits.remove',eitId);
        });
        
      }    
    });