const fs = require('fs');
const data = fs.readFileSync('./db/db.json');
let notesData = JSON.parse(data);

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(notesData);
  });
  
  // function to write to JSON file anytime notes are updated, add, removed from list
  function writeToJSONfile(){
    const noteChanged = JSON.stringify(notesData, null, 2);
    fs.writeFile('./db/db.json', noteChanged, finished);
    function finished(err){
      console.log('JSON file updated!');
    }
  };
  
  app.post('/api/notes', (req, res) => {
    const newNotes = req.body;
    notesData.push(req.body);
    writeToJSONfile();
    res.json(newNotes);
  });

  // API call for deleting a note from the list or array
  app.delete('/api/notes/:id', (req, res) => {
    const deleteID = req.params.id;
    for (let i = 0; i < notesData.length; i++) {
      if (deleteID === notesData[i].id) {
        notesData.splice(i, 1);
        writeToJSONfile();
      }
    }
    res.end();
  });

  app.post('/api/clear', (req, res) => {
    // server code for clearing out all the notes when clicked on in future release
  });
}