const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../model/user');

module.exports = {//resolver use jwt and bcrypt to authenticate user and create token for user to use in graphql
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      { expiresIn: '1h' }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  }
};