const express = require("express");
const routes = express.Router();

routes.post("/locations", (req, res) => {
    const {latitude, longitude } = req.body;

    if(!latitude || !longitude){

        return res.status(400).json.apply({error: "Coordenadas Obrigatorias"});
        
    }

    return res.status(201).json({
        message: "Localizacao recebida",
        latitude,
        longitude
    });
});

module.exports = routes;