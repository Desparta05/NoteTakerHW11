const fs = require('fs');
const data = fs.readFileSync('./db/db.json');
const notesInfo = JSON.parse(data);
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


module.exports = (router) => {
  router.get('/api/notes', (req, res) => {
      const notesInfo = JSON.parse(fs.readFileSync('./db/db.json'));
      res.json(notesInfo);
  });
  
  // function to write to JSON file anytime notes are updated, add, removed from list
  function writeToJSONfile(){
    const noteChanged = JSON.stringify(notesInfo, null, 2);
    fs.writeFile('./db/db.json', noteChanged, finished);
    function finished(err){
      console.log('JSON file updated!');
    }
  };
  
  router.post('/api/notes', (req, res) => {
    const notesInfo = JSON.parse(fs.readFileSync('./db/db.json'));
    const noteID = Object.assign(req.body, { id: `${uuidv4()}` }); 
    notesInfo.push(noteID);
    const stringNote = JSON.stringify(notesInfo);
    fs.writeFileSync('./db/db.json', stringNote);
    res.json(notesInfo);
  });

  router.delete('/api/notes/:id', (req, res) => {
    const notesInfo = JSON.parse(fs.readFileSync('./db/db.json'));
    const noteID = req.params.id;
    for (let i = 0; i < notesInfo.length; i++) {
      if (notesInfo[i].id === noteID) {
        notesInfo.splice(i, 1);
        const newNotes = JSON.stringify(notesInfo);
        fs.writeFileSync('./db/db.json', newNotes);
        return res.json(notesInfo);
      }
    }
  });
}

