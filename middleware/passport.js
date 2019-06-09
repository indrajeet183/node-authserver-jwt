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
        },
        attributes: ["code", "name", "role", "username", "id"],
        include: [
          {
            model: db.RolesActions,
            as: "RolesActionsU",
            attributes: ["action"],
            include: [
              {
                model: db.Modules,
                as: "Modules",
                attributes: ["name"]
              }
            ]
          }
        ]
      }).then(function(user) {
        if (!user) {
          callback(null, false);
          return;
        }

        let roleActionsWithModule = user["RolesActionsU"];
        const mappedRoleActionsWithModule = roleActionsWithModule.map(rm => {
          return rm.Modules.name + "." + rm.action;
        });

        callback(null, {
          code: user.code,
          name: user.name,
          role: user.role,
          username: user.username,
          id: user.id,
          roleactions: mappedRoleActionsWithModule,
          isAdmin: user.role === 1 ? true : false
        });
      });
    })
  );
};

export default hookJWTStrategy;
