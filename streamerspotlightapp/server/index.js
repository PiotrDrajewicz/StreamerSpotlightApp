const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const streamersRouter = require('./routes/Streamers');
app.use("/streamers", streamersRouter);
  
//Creating database tables and starting server
db.sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log('server running on port 5000');
    })
})