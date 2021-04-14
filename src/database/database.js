const mongoose = require('mongoose');
module.exports = mongoose.connect('mongodb://localhost:27017/RoleReactions', {useNewUrlParser: true, useUnifiedTopology: true});