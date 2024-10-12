const allowedList = require('./allowedList');

const corsOptions = {
  origin: (origin, callback) => {
    if(!origin || allowedList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By Cors"));
    }
  },
  optionSuccessStatus: 200,
  credentials: true
};

module.exports = corsOptions;