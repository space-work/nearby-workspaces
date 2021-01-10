const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env')});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});