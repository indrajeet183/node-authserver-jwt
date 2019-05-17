import { Strategy, ExtractJwt } from "passport-jwt";
import db from "../storage/db";

// Hooks the JWT Strategy.
const hookJWTStrategy = passport => {
  let options = {};

  options.secretOrKey = process.env.KEY;
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  options.ignoreExpiration = false;

  passport.use(
    new Strategy(options, (JWTPayload, callback) => {
      db.Employee.findOne({
        where: {
          office_email: JWTPayload.email
        }
      }).then(function(user) {
        if (!user) {
          callback(null, false);
          return;
        }
        callback(null, user);
      });
    })
  );
};

export default hookJWTStrategy;
