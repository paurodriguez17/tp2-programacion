const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  city: String,
  date: { type: Date, default: Date.now }
});

const SearchHistory = mongoose.model('historial', searchHistorySchema);

module.exports = SearchHistory;