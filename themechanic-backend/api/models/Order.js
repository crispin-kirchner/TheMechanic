/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    number: {
      type: 'string',
      defaultsTo: () => {
        // get a random decimal number of length 9
        var decimal = Math.floor(Math.random() * 1e9).toString();
        
        // pad with leading zeros if necessary
        var pad = '000000000';
        decimal = pad.substring(0, Math.max(0, pad.length - decimal.length)) + decimal;

        // put into the desired format
        return decimal.substring(6, 9) + '-' + decimal.substring(0, 6);
      },
      unique: true,
      size: 10
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

