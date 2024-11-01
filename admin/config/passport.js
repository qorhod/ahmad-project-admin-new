

// هذا للمصادقة عند ستجيل الدخول يعني نقدر نخلي تسجيل الدخول عنطريق قوقل او فيسبوك إلخ ولكني خليتها باليوز والرقم السري

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

module.exports = function(passport) {
  passport.use('admin-local', new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const admin = await Admin.findOne({ username: username });
      if (!admin) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!admin.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, admin);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.findById(id);
      done(null, admin);
    } catch (err) {
      done(err, null);
    }
  });
};
