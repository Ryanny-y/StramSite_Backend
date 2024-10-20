const User = require('../../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) return res.status(400).json({'message': "Username And Password are required!"});

  try {
    const foundUser = await User.findOne({ username}).exec();
    if(!foundUser) return res.status(404).json({'message': `User ${username} not found`});  
  
    const match = await bcrypt.compare(password, foundUser.password);
    if(match) {
      const accessToken = jwt.sign(
        { username: username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m'},
      )

      const refreshToken = jwt.sign(
        { username: username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '15m'},
      );

      foundUser.refresh_token = refreshToken;
      await foundUser.save();

      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // secure: true, sameSite: None
      res.json({
        user_data: {
          id: foundUser._id,
          username: foundUser.username,
        },
        access_token: accessToken
      })

    } else {
      return res.status(401).json({'message': 'Username or Password is incorrect'});
    }
  } catch (error) {
    res.status(500).json({'message': error.message});
  }
  
};

module.exports = handleLogin;