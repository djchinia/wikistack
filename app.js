const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const index = require("./views/index");
const {db} = require("./models");
const app = express();

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

app.use(morgan("dev"));
app.use(express.static(__dirname + "./public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.get("/", function(req, res, next){
    res.send(index.main());
});

const PORT = 3000;

const init = async () => {
    await db.sync();

    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
    });
}

init();