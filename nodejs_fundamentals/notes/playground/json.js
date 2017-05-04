const fs = require('fs');
const path = require('path');

const originalNote = {
  title: 'Some title',
  body: 'Some body'
};

const filePath = path.resolve(__dirname, 'notes.json');

const originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync(filePath, originalNoteString);

const noteString = fs.readFileSync(filePath);
const note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);