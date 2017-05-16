const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleArg = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyArg = {
  describe: 'Note content',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', { 
    title: titleArg, 
    body: bodyArg 
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', { title: titleArg })
  .command('remove', 'Deletes a note', { title: titleArg })
  .help()
  .argv;
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

  case 'remove':
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