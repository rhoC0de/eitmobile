import { Template } from 'meteor/templating';
 
import { Eits } from '../api/eits.js';
import {arr} from '../api/const.js'; 

import './eit.html';
 
Template.eit.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Eits.update(this._id, {
      $set: { checked: ! this.checked },
    });
  // },
  // 'click .delete'() {
  //   Eits.remove(this._id);
  },
  'click .edit'(){
    // fetch data
    Eits.find(this._id);
    // fill form
    const target = document.querySelector("form");
    target.firstname.value = this.firstname;
    target.surname.value = this.surname;
    target.gender.value = this.gender;
    target.dob.value = this.dob;
    // keep id
    arr.push(this._id);
  },
  // 'click.delete-all'() {
  //     Eits.find(this._id);
  //     arr.remove(this._id);
  // }
});

