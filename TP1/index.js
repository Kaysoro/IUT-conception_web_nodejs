let express = require('express');
let app = express();
app.use(express.static('public'));

let tickets = [
 {id:0, title:'coucou', priority:3},
 {id:1, title:'hello', priority:2},
 {id:2, title:'hola', priority:1},
];

app.get('/', function(req, res) {
    console.log("Oh un visiteur!");
    res.render(__dirname + '/public/index.ejs', {'tickets':tickets});
});

// Liste tous les tickets sur localhost:8080/tickets
app.get('/tickets', function(req, res) {
    res.json(tickets);
});

// Liste un ticket déterminé par son id
app.get('/ticket/:id', function(req, res) {
    res.json(tickets[req.params.id]);
});

// Liste un ticket déterminé par son id
app.get('/ticket/delete/:id', function(req, res) {
    tickets = tickets.filter(item => item.id.toString() !== req.params.id)
    res.redirect('/');
});

// localhost:8080/addAsync?title=coucou mdr&priority=3
app.get("/addAsync",function(req, res) {
	console.log(req.query);
	let ticket = {
        id: tickets.length + 1,
		title: req.query.title,
		priority: req.query.priority,
	};
	tickets.push(ticket);
	res.json(ticket);
});

// localhost:8080/add?title=coucou mdr&priority=3
app.get("/add",function(req, res) {
	console.log(req.query);
	let ticket = {
        id: tickets.length + 1,
		title: req.query.title,
		priority: req.query.priority,
	};
	tickets.push(ticket);
	res.redirect("/")
});

console.log("I'm listening on 8080 bro");
app.listen(8080);