const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
const command = argv._[0];

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
  
  case 'list': {
    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(notes.logNote);
    break;
  }

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