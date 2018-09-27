import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Eits = new Mongo.Collection('eits');

Meteor.methods({
    'eits.insert'(text) {
      check(text, String);
   
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
   
      Eits.insert({
        text,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
      });
    },
    'eits.remove'(eitId) {
      check(eitId, String);
   
      Eits.remove(eitId);
    },
    'eits.setChecked'(eitId, setChecked) {
      check(eitId, String);
      check(setChecked, Boolean);
   
      Eits.update(eitId, { $set: { checked: setChecked } });
    },
  });