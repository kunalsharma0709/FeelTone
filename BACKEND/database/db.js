const mongoose = require("mongoose")

mongoose.connect(
  "mongodb://cr7xkunal:lollodon@ac-r5fwkl4-shard-00-00.tz4y4ua.mongodb.net:27017,ac-r5fwkl4-shard-00-01.tz4y4ua.mongodb.net:27017,ac-r5fwkl4-shard-00-02.tz4y4ua.mongodb.net:27017/Capstoneproject?ssl=true&replicaSet=atlas-nt0zec-shard-0&authSource=admin&appName=Cluster0"
);

const emotionsschema=mongoose.Schema({
     "gender":String,
     "emotion":String,
     "filePath":String,
     "agegroup":String
})

const languageSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  languages: {
    type: Map,
    of: String,
    required: true
  }
});

const emotions = mongoose.model("emotions",emotionsschema);
const languages = mongoose.model("languages", languageSchema);


module.exports={emotions,languages};
