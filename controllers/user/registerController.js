const User = require('../../model/User');
const Favorites = require('../../model/Favorites');
const Watchlist = require('../../model/Watchlist');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;
  
  if(!username || !email || !password) return res.status(400).json({"message": "All Fields are required!"});
  try {
    const duplicate = await User.findOne({ username }).exec();
    if(duplicate) return res.status(409).json({'message': "Username already taken."});

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const favorites = await Favorites.create({
      user_id: newUser._id,
      favorites: []
    });

    const watchlist = await Watchlist.create({
      user_id: newUser._id,
      watchlists: []
    });

    newUser.favorites = favorites._id;
    newUser.watchlist = watchlist._id;
    
    await newUser.save();

    res.status(201).json({"message": `User ${newUser.username} created!`});

  } catch (error) {
    res.status(500).json({"message": error.message});    
  }

};


module.exports = handleRegister;