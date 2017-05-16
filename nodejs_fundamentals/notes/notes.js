console.log('Starting notes.js');
const fs = require('fs');

const notesFileName = 'notes-data.json';

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync(notesFileName);
    return JSON.parse(notesString);
  } catch(e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync(notesFileName, JSON.stringify(notes));
};

const addNote = (title, body) => {
  let notes = fetchNotes();

  const duplicateNotes = notes.filter(note => note.title === title);
  
  if (duplicateNotes.length === 0) {
    const note = { title, body };
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  console.log('Getting all notes');
};

const getNote = (title) => {
  const notes = fetchNotes();
  const foundNotes = notes.filter(note => note.title === title);
  return foundNotes[0];
};

const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return filteredNotes.length !== notes.length;
}

const logNote = (note) => {
  console.log('--');
  console.log('Title:', note.title);
  console.log('Body:', note.body);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
