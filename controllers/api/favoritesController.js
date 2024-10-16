const Favorites = require("../../model/Favorites");

const getFavorites = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) return res.status(400).json({ message: "User Id is required" });

  try {
    const foundList = await Favorites.findOne({ user_id }).exec();

    if (!foundList)
      return res.status(404).json({ message: `Favorites List Not Found!` });

    const favorites = foundList.favorites;

    res.json({ favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToFavorites = async (req, res) => {
  const { user_id, show_id } = req.body;

  if (!user_id || !show_id)
    return res
      .status(400)
      .json({ message: "User Id and Show Id are requied!" });

  try {
    const foundList = await Favorites.findOne({ user_id }).exec();

    if (foundList) {
      const isAdded = foundList.favorites.some((id) => show_id === id);
      if (isAdded)
        return res
          .status(409)
          .json({ message: `Show ${show_id} is already on the Favorites.` });

      foundList?.favorites.push(show_id);
      await foundList.save();
    } else {
      const newFavorites = await Favorites.create({
        user_id,
        favorites: [show_id]
      });
    }

    res.status(201).json({'message': `Show ${show_id} added to Favorites`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  const { show_id, user_id } = req.body;

  if(!user_id || !show_id) return res.status(400).json({'message': 'Show Id and User Id are required'});

  try {
    const foundList = await Favorites.findOne({ user_id }).exec();
    if(!foundList) return res.status(404).json({ message: `Favorites List Not Found`});
    
    const foundShow = foundList.favorites.some(id => id === show_id);
    if(!foundShow) return res.status(409).json({ message: `Show ${show_id} Not Found!`});

    const filteredList = foundList.favorites.filter(id => id !== show_id);
    foundList.favorites = filteredList;
    await foundList.save();
    
    res.json({
      message: `Show ${show_id} removed.`,
      favorites: foundList.favorites
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }

};

module.exports = { getFavorites, addToFavorites, removeFromFavorites };
