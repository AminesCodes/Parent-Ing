const Express = require('express');
const Router = Express.Router();

const Users = require('../../Models/Users');
// const a = async() => {
//     const user = {
//         username: 'crazy', 
//         firstname: 'A', 
//         lastname: 'B', dob: '2000-01-01', 
//         user_password: 'tired', 
//         email: 'a@b.com'
//     }
//     // const b = await Users.getUserByUsername('aminescodess')
//     // const b = await Users.createUser(user)
//     console.log(b)
//     return b
// }
// a()

Router.get('/all', async (request, response) => {
    try {
        const allUsers = await Users.getAllUsers();
        response.json({
            status: 'success',
            payload: allUsers,
        })
    } catch (err) {
        console.log(err)
        response.status(500)
        response.json({
            status: 'failed',
            payload: null,
        })
    }
})

Router.get('/:username', async (request, response) => {
    const username = request.params.username
    let userId = false,

    if (!isNaN(parseInt(username)) && username.length === (parseInt(username) + '').length) {
        userId = username
    }

    if (userId) {
        try {
            const targetUser = await Users.getUserById(userId);
            response.json({
                status: 'success',
                payload: targetUser,
            })
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'failed',
                payload: null,
            })
        }
    } else {
        try {
            const targetUser = await Users.getUserByUsername(username.toLowerCase());
            response.json({
                status: 'success',
                payload: targetUser,
            })
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'failed',
                payload: null,
            })
        }
    }
})

Router.post('/signup', async (request, response) => {
    const { username, firstname, lastname, dob, password, email } = request.body

    if (!username || !firstname || !lastname || !dob || !password || !email) {
        response.status(500)
            response.json({
                status: 'failed',
                payload: null,
            })
    } else {
        try {
            const newUser = await Users.createUser(request.body)
            response.json({
                status: 'success',
                payload: newUser,
            })
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'failed',
                payload: null,
            })
        }
    }
})

Router.put('/:userId', async (request, response) => {
    const userId = request.params.userId;
    const { username, firstname, lastname, dob, password, email } = request.body

    if (!username || !firstname || !lastname || !dob || !password || !email) {
        response.status(500)
            response.json({
                status: 'failed',
                payload: null,
            })
    } else {
        try {
            const authorizedToUpdate = await Users.authentifyUser(userId, password)

            if (authorizedToUpdate) {
                try {
                    const updatedUser = await Users.updateUserInfo(request.body)
                    response.json({
                        status: 'success',
                        payload: updatedUser,
                    })
                } catch (err) {
                    console.log(err)
                    response.status(500)
                    response.json({
                        status: 'failed',
                        payload: null,
                    })
                }
            } else {
                response.status(500)
                response.json({
                    status: 'failed',
                    payload: null,
                })
            }
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'failed',
                payload: null,
            })
        }
    }
})

module.exports = Router