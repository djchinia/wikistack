const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const index = require("./views/index");
const models = require("./models");
const app = express();
// routers
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

app.use(morgan("dev"));
app.use(express.static(`${__dirname}./public`));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
console.log('h');

// add router connections 
app.use("/wiki", wikiRouter);
app.use("/user", userRouter);



// app.get("/", function(req, res, next){
//     res.send('<html><h1>connection is working</h1></html>');
// });

app.get("/", function(req, res, next){
    res.send(index.main());
});


const PORT = 3000;

const init = async () => {
    await models.db.sync();

    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
    });
}

init();