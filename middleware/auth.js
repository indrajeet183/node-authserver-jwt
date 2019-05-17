import jwt from "jsonwebtoken";
import db from "../storage/db";
import bcrypt from "bcrypt";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
let AuthController = {};

AuthController.signUp = (req, res) => {
  const newUser = {
    office_email: req.body.office_email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, salt),
    personal_email: req.body.personal_email,
    designation: req.body.designation,
    shift: req.body.shift,
    status: req.body.status,
    username: req.body.username,
    code: req.body.code
  };

  return db.sequelize.transaction().then(t => {
    return db.Employee.findOrCreate({
      where: { office_email: req.body.office_email },
      defaults: newUser,
      transaction: t
    })
      .spread((user, created) => {
        // if user email already exists
        if (!created) {
          return res.status(409).json("User with email address already exists");
        } else {
          return t
            .commit()
            .then(() => {
              return res.status(200).json({
                success: true
              });
            })
            .catch(err => {
              console.log(err);
              return t.rollback().then(() => {
                return res.status(500).json(err);
              });
            });
        }
      })
      .catch(error1 => {
        console.log("find or create");
        console.log(error1);
        return t.rollback().then(() => {
          return res.status(500).json(error1);
        });
      });
  });
};

function comparePasswords(password, userPassword, callback) {
  bcrypt.compare(password, userPassword, function(error, isMatch) {
    if (error) {
      return callback(error);
    }
    return callback(null, isMatch);
  });
}

AuthController.authenticateUser = function(req, res) {
  const email = req.body.office_email,
    password = req.body.password,
    potentialUser = {
      where: { office_email: email }
    };

  return db.Employee.findOne(potentialUser)
    .then(function(user) {
      if (!user) {
        return res.status(404).json("Authentication failed!");
      } else {
        comparePasswords(password, user.password, function(error, isMatch) {
          if (isMatch && !error) {
            var token = jwt.sign({ email: user.office_email }, process.env.KEY);

            return res.json({
              success: true,
              token: "JWT " + token,
              role: user.role
            });
          } else {
            return res.status(404).json("Login failed!");
          }
        });
      }
    })
    .catch(function(error) {
      return res.status(500).json("There was an error!");
    });
};

export default AuthController;
