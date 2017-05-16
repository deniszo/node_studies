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
  case 'add': {
    const note = notes.addNote(argv.title, argv.body);
    if (typeof note !== 'undefined') {
      console.log('Note created');
      notes.logNote(note);
    } else {
      console.log('A note with such title already exists');
    }
    break;
  }
  
  case 'list':
    notes.getAll();
    break;
  
  case 'read': {
    const note = notes.getNote(argv.title);
    if (typeof note !== 'undefined') {
      console.log('Note found');
      notes.logNote(note);
    } else {
      console.log('Note not found');
    }
    break;
  }

  case 'delete':
    const noteRemoved = notes.removeNote(argv.title);
    const message = noteRemoved
      ? `Note was removed: "${argv.title}"`
      : 'Note was not removed';
    console.log(message);
    break;

  default:
    console.log('Command not recognized');
    break;
}