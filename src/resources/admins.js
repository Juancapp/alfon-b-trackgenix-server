const express = require("express");
const admins = require("../data/admins.json");
const router = express.Router();
const fs = require("fs");

router.delete("/delete/:id", (req, res) => {
    const adminId = req.params.id;
    const filteredAdmin = admins.filter((admin) => admin.id != adminId);
    //console.log(filteredAdmin);
    fs.writeFile("src/data/admins.json", JSON.stringify(filteredAdmin), (err) => {
        if(err){
            res.send("Cannot delete admin");
        }
        else {
            res.send("Admin deleted");
        }
    })
})





module.exports = router;