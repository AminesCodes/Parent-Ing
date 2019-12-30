const Express = require('express');
const Router = Express.Router();

const Users = require('../../Models/Users');


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
    let userId = false

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


// Login a registered user
Router.patch('/login', async (request, response) => {
    const { password, email } = request.body

    if (!password || !email) {
        response.status(400)
            response.json({
                status: 'failed',
                message: 'Missing Information',
            })
    } else {
        try {
            const userToLog = await Users.logUser(email, password)
            if (userToLog) {
                response.json({
                    status: 'success',
                    payload: userToLog,
                })
            } else {
                response.status(401)
                response.json({
                    status: 'failed',
                    message: 'Bad Combination email/password',
                })
            }
        } catch (err) {
            console.log(err)
            response.status(500)
            response.json({
                status: 'failed',
                message: 'Sorry, something went wrong',
            })
        }
    }
})


Router.post('/signup', async (request, response) => {
    const { username, firstname, lastname, dob, password, email } = request.body

    if (!username || !firstname || !lastname || !dob || !password || !email) {
        response.status(400)
            response.json({
                status: 'failed',
                message: 'Missing Information',
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
        response.status(400)
            response.json({
                status: 'failed',
                message: 'Missing Information',
            })
    } else {
        try {
            const authorizedToUpdate = await Users.authentifyUser(userId, password)

            if (authorizedToUpdate) {
                try {
                    const updatedUser = await Users.updateUserInfo(userId, request.body)
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


Router.patch('/:userId/password', async (request, response) => {
    const userId = request.params.userId;
    const { oldPassword, newPassword, confirmedPassword } = request.body

    if (!oldPassword || !newPassword || !confirmedPassword ||newPassword !== confirmedPassword) {
        response.status(400)
            response.json({
                status: 'failed',
                message: 'Missing Information',
            })
    } else {
        try {
            const authorizedToUpdate = await Users.authentifyUser(userId, oldPassword)

            if (authorizedToUpdate) {
                try {
                    const updatedUser = await Users.updateUserInfo(userId, newPassword)
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


Router.patch('/:userId/delete', async (request, response) => {
    const userId = request.params.userId;
    const { password } = request.body

    if (!password) {
        response.status(400)
            response.json({
                status: 'failed',
                message: 'Missing Information',
            })
    } else {
        try {
            const authorizedToUpdate = await Users.authentifyUser(userId, password)

            if (authorizedToUpdate) {
                try {
                    const deletedUser = await Users.deleteUSer(userId)
                    response.json({
                        status: 'success',
                        payload: deletedUser,
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