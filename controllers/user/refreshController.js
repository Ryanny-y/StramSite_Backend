const User = require('../../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;

  if(!cookies?.jwt) return res.sendStatus(401);
  const refresh_token = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refresh_token }).exec();
    if(!foundUser) return res.status(404).json({'message': 'User not found'});
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const access_token = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1m'}
        );
        res.json({ access_token });
      }
    )

  } catch (error) {
    res.status(500).json({'message': error.message})
  }

};

module.exports = handleRefresh;