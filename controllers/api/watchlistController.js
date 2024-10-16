const Watchlist = require("../../model/Watchlist");

const getWatchlists = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id)
    return res.status(404).json({ message: `User ${user_id} Not Found!` });
  try {
    const foundList = await Watchlist.findOne({ user_id });

    if(!foundList) return res.status(404).json({'message': 'Watchlist not found'});

    const watchlist = foundList.watchlists;

    res.json({ watchlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToWatchlist = async (req, res) => {
  const { user_id, show_id } = req.body;

  if (!show_id || !user_id)
    return res.status(400).json({ message: "Show Id is required" });

  try {
    const foundList = await Watchlist.findOne({ user_id }).exec();

    if (foundList) {
      const isAdded = foundList.watchlists.some(id => show_id === id);
      if (isAdded)
        return res
          .status(409)
          .json({ message: "Show is already on the watchlist" });

      foundList?.watchlists.push(show_id);
      await foundList.save();
    } else {
      await Watchlist.create({
        user_id,
        watchlists: [show_id],
      });
    }
    res.status(201).json({ message: `show ${show_id} added to watchlist` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeToWatchlist = async (req, res) => {
  const { user_id, show_id } = req.body;

  if (!user_id || !show_id)
    return res
      .status(400)
      .json({ message: "User Id and Show Id are required" });

  try {
    const foundList = await Watchlist.findOne({ user_id }).exec();
    if (!foundList)
      return res.status(404).json({ message: `Watchlist Not Found!` });

    // check if the show_id is on the watchlist
    const foundShow = foundList.watchlists.some((id) => id === show_id);
    if (!foundShow)
      return res.status(404).json({ message: `Show ${show_id} Not Found!` });

    const filteredList = foundList.watchlists.filter((id) => id !== show_id);

    foundList.watchlists = filteredList;
    await foundList.save();

    res.json({
      message: `Show ${show_id} removed.`,
      watchlist: foundList.watchlists,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWatchlists, addToWatchlist, removeToWatchlist };
