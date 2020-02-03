let con = require('./db');
let express = require('express');
let app = express();
app.use(express.static('public'));

app.get('/', function(req, res) {
	console.log("Hello Bro!");
	con.query('SELECT * FROM ticket', (err,rows) => {
		if(err) throw err;
		res.render(__dirname + '/public/index.ejs', {'tickets':rows});
	  });
});

// Liste tous les tickets sur localhost:8080/tickets
app.get('/tickets', function(req, res) {
	con.query('SELECT * FROM ticket', (err,rows) => {
		if(err) throw err;
		res.json(rows);
	  });
});

// Liste un ticket déterminé par son id
app.get('/ticket/:id', function(req, res) {
	con.query('SELECT * FROM ticket WHERE id = ?', req.params.id, (err,rows) => {
		if(err) throw err;
		res.json(rows);
	  });
});

// Liste un ticket déterminé par son id
app.get('/ticket/delete/:id', function(req, res) {
	con.query('DELETE FROM ticket WHERE id = ?', req.params.id, (err,rows) => {
		if(err) throw err;
		res.redirect('/');
	  });
});

// localhost:8080/add?title=coucou mdr&priority=3
app.get("/add",function(req, res) {
	console.log(req.query);
	con.query('INSERT INTO ticket SET ?', { 'title': req.query.title, 'priority': req.query.priority},
	 (err,rows) => {
		if(err) throw err;
		res.redirect('/');
	  });
});

console.log("I'm listening on 8080 bro");
app.listen(8080);