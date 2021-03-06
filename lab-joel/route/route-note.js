'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');


module.exports = function(router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try {
      debugger;
      let newNote = new Note(req.body.title, req.body.content);

      storage.create('Note', newNote)
        .then(storedNote => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedNote));
          res.end();
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });

  router.get('/api/v1/note', (req, res) => {
    debug('GET /api/v1/note');

    try {
      storage.fetchAll('Note') //use the key
        .then(allNotes => {
          debug('all data', allNotes);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(allNotes));
          res.end();
        });
    } catch (err) {
      debug(`There was a bad GET request: ${err}`);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad GET Request');
      res.end();
    }
  });

  router.put('/api/v1/note', (req, res) => {

  });

  router.delete('/api/v1/note', (req, res) => {

  });
};
