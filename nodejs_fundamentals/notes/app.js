console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;

const command = process.argv[2];
console.log('Command', command);

console.log('Yargs', argv);

switch(command) {
  case 'add':
    notes.addNote(argv.title, argv.body);
    break;
  
  case 'list':
    notes.getAll();
    break;
  
  case 'read':
    notes.getNote(argv.title);
    break;

  case 'delete':
    notes.removeNote(argv.title);
    break;

  default:
    console.log('Command not recognized');
    break;
}