const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const loginRoute = require('./routes/LoginRoute');
const registerRoute = require('./routes/RegisterRoute');
const scrapRoute = require('./routes/ScrapRoute');
const SearchRoute = require('./routes/SearchRoute');
const IsuserRoute = require('./routes/IsuserRoute');

app.use('/login',loginRoute);
app.use('/register',registerRoute);
app.use('/scrap',scrapRoute);
app.use('/search',SearchRoute);
app.use('/isuser',IsuserRoute);


app.listen(PORT,() => {
    console.log(`Server started. Listening on ${PORT}`);
});