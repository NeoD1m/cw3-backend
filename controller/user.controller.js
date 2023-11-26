const db = require('../db')

class UserController{
    async createUser(req,res){
        //console.log(req)
        console.log("start")

        console.log(req.query)
        //console.log(req.body["userimage"])
        const {username,wage,about,email,password} = req.query
        const userimage = Buffer.from(req.body["userimage"], 'base64');
        const newPerson = await db.query(`INSERT INTO person (username,wage,about,email,userimage,password) values ($1, $2, $3, $4, $5, $6) RETURNING *;`, [username,wage,about,email,userimage,password])
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.json(newPerson.rows[0])
    }
    async getUsers(req,res){
        const users = await db.query('SELECT * FROM person')
        res.json(users.rows)
    }
    async getOneUser(req,res){
        const id = req.params.id
        const user = await db.query('SELECT * FROM person where id = $1', [id])
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.json(user.rows[0])
    }
    async getLogin(req,res){
        const {username,password} = req.query
        const user = await db.query('SELECT EXISTS(SELECT * FROM person where username = $1 AND password = $2)', [username,password])
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.json(user.rows[0])
    }
    async updateUsers(req,res){
        const {oldname,username,wage,about,email,password} = req.body
        console.log(oldname,username,wage,about,email,password)
        const userimage = Buffer.from(req.body["userimage"], 'base64');
        const user = await db.query('UPDATE person SET username = $1, wage = $2, about = $3, email = $4, userimage = $5, password = $6 WHERE username = $7;', [username,wage,about,email,userimage,password,oldname])
        res.json(user.rows[0])
    }
    async deleteUser(req,res){
        const id = req.params.id
        const user = await db.query('DELETE FROM person where id = $1', [id])
        res.json(user.rows[0])
    }
    async getRandomUsersId(req,res){
        const amountOfUsers = await db.query('SELECT * FROM person')
        var randomNumbers = [];
        while (randomNumbers.length < 5) {
            let num = Math.floor(Math.random() * amountOfUsers.rowCount) + 1;
    
            if (randomNumbers.indexOf(num) === -1) {
                randomNumbers.push(num);
            }
        }
        res.json(randomNumbers)
    }
}

module.exports = new UserController()