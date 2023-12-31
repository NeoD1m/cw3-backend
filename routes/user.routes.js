const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller.js')

router.post('/user', userController.createUser)
router.get('/user', userController.getUsers)
router.get('/user/:id', userController.getOneUser)
router.put('/user', userController.updateUsers)
router.delete('/user/:id', userController.deleteUser)

router.get('/userids', userController.getRandomUsersId)
router.post('/login',userController.getLogin)

module.exports = router