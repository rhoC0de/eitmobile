
import { Template } from 'meteor/templating';
 
import { Eits } from '../api/eits.js';

import './body.html';
 
Template.body.helpers({
    eits() {
        return Eits.find({});
      },
});