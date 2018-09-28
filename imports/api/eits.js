import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Eits = new Mongo.Collection('eits');

Meteor.methods({
    'eits.insert'(eitData) {
      check(eitData.firstname, String);
      check(eitData.surname, String);
      check(eitData.gender, String);
      check(eitData.dob, String);
   
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
   
      Eits.insert(eitData);

      Eits.find(eitData);
    },

    'eits.edit'(eitData) {
        check(eitData.firstname, String);
        check(eitData.surname, String);
        check(eitData.gender, String);
        check(eitData.dob, String);
     
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }
     
        Eits.update(eitId, {
            $set: { firstname: firstname, surname: surname, gender: gender, dob: dob }
      })
    },

    'eits.remove'(eitId) {
      check(eitId, String);
   
      Eits.remove(eitId);
    },

    'eits.setChecked'(eitData, setChecked) {
      check(eitData, String);
      check(setChecked, Boolean);
   
      
      Eits.update(eitData, { $set: { checked: setChecked } });
    },
});