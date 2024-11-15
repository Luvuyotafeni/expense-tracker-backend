const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

//cors configuration

app.use(cors());
app.use(express.json());

//db connection
mongoose.connect("mongodb+srv://luvuyo:1234@tester.sgrsmdc.mongodb.net/Expense_tracker?retryWrites=true&w=majority", 
    { useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

// starting the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));