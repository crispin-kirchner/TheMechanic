/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    number: {
      type: 'integer',
      autoIncrement: true
    },
    
    checkInDate: {
      type: 'date',
      required: true
    },
    
    repairRequests: {
      type: 'text',
      required: true
    },
    
    bicycle: {
      type: 'string',
      required: true
    },
    
    client: {
      type: 'string'
    },
    
    startWorkingDate: {
      type: 'date'
    },
    
    doneDate: {
      type: 'date'
    }
  }
};

