const Express = require('express');
const Router = Express.Router();

const Users = require('../../Models/Users');
const a = async() => {
    const b = await Users.getUserByUsername('aminescodeS')
    console.log(b)
    return b
}
a()

module.exports = Router