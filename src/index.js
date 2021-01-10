const express = require("express");
const morgan = require("morgan");
const { dirname } = require("path");
const path = require("path");

const app  = express();


// arrayList
const lists = [
    { id: 1, movies: 'SONIC', category: '2D', quantity: '4' },
];

//settings

app.set('port', process.env.PORT || 4000);


// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// routes

app.get('/lists', (req, res) => {
    res.json(lists)
});

app.post('/lists', (req, res) => {
    const { movies, category, quantity } = req.body;
    lists.push({
        id: lists.length + 1,
        movies,
        category,
        quantity
    });
    res.send('Succesfully');
});

//static files

app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});