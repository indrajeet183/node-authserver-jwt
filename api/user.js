import db from '../storage/db'
import passport from 'passport'

const getUsers = (req,res) => {
    db.Employee.findAll()
        .then(user => {
            res.status(200).json(user);
        }).
        catch(err => {
            res.json('Something wrong ',err)
        })
}

var express = require('express')
  , router = express.Router()

router.get('/getUsers',passport.authenticate('jwt', { session: false }),getUsers)

export default router

