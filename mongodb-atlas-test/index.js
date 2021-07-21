//npm i -S mongo  npm i nodemon
//配置Atlas連線字串
const {
	MongoClient
} = require('mongodb');
const uri = "mongodb+srv://samtest:test123@cluster0.qdrpw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
client.connect(err => {
	if (err) {
		return console.log("連結數據庫失敗");
	}
	console.log("數據庫連接成功")
	const collection = client.db("test").collection("devices")
	// perform actions on the collection object
	collection.insertOne({
		"devId": 2,
		"name": "2號設備"
	}, function(err, docs) {
		if (err) {
			return console.log(err)
		} else {
			console.log(docs)
		}
		client.close();
	})

});
