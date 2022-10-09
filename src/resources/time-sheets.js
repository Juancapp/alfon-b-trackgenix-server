const express = require('express');
const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get("/getAll", (req, res)  => {
    res.send(timeSheets);
})

router.get("/getByid/:id",(req, res) => {
    const userId = req.params.id;
    const foundUser = timeSheets.find((user) => user.id === userId)
    if(foundUser){
        res.send(foundUser)
    }else{
        res.send("User not found")
    }
})

router.post("/add", (req, res) => {
    const newUser = req.body;
    timeSheets.push(newUser);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
        if(err){
            res.send("Cant save new user")
        }else{
            res.send("User created")
        }
    })
})


module.exports = router;