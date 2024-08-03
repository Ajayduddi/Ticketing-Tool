import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { user } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/helper.mjs";

passport.serializeUser((user, done) => {
  console.log("inside SerilalizeUser");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("inside deserializeUser");
  try {
    const finduser = await user.findById(id);
    if (finduser) {
      finduser.status == "Active" ? done(null, finduser) : done("user not active", null);
    } else {
      done("user not found", null);
    }
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new localStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      console.log("inside local strategy");
      try {
        const finduser = await user.findOne({ email: username });
        if (!finduser) {
          throw new Error("User not found");
        }
        const result = comparePassword(password, finduser.password);
        if (result) {
          if (finduser.status == "Active") {
            done(null, finduser);
          } else {
            throw new Error("User not active");
          }
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
