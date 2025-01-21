const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() })
    .then(user => {
      if (!user) { return done(null, false, 'Invalid Credentials'); }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, 'Invalid credentials.');
      });
    })
    .catch(err => done(err));
}));


async function signup({ email, password, req }) {
  if (!email || !password) { throw new Error('You must provide an email and password.'); }

  const user = new User({ email, password });
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) { throw new Error('Email in use'); }

    await user.save();

    return new Promise((resolve, reject) => {
      req.logIn(user, (err) => {
        if (err) { reject(err); }
        resolve(user);
      });
    });
  } catch (err) {
    throw err;
  }
}

function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) { reject(err); }
      if (!user) { reject('Invalid credentials.') }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

module.exports = { signup, login };
