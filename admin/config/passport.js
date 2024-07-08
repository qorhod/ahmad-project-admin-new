const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

module.exports = function(passport) {
  passport.use('admin-local', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        return done(null, false, { message: 'Incorrect email.' });
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
