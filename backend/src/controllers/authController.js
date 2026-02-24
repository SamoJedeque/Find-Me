const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Location = require("../models/Location");

exports.register = async (req, res) => {
    try {
        const { name, email, password, latitude, longitude } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (latitude && longitude) {
            await Location.create({
                user_id: user.id,
                latitude,
                longitude
            });
        }

        res.status(201).json({
            message: "Usuário criado com sucesso"
        });

        // console.log(req.body);

        // res.json({ ok: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {

    const {email, password } = req.body;

    const result = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    if(result.rows.length === 0){

        return res.status(400).json({ error: "Ususario nao encontrado"});
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if(!valid){
        return res.status(400).json({ error: "senha errada"});
    }

    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.json({ token });
};

