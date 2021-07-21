const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://samtest:test123@cluster0.qdrpw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
//封裝基本mongo操作
async function insertCmd(number) {
	await client.connect();
	const cmd = client.db('test').collection('cmd');
	res = await cmd.insertOne({
		"devId":6,
		"name":number+"號設備"
	})
	client.close()
	return res
}

async function getAllCmdName() {
	await client.connect();
	const cmd = client.db('test').collection('cmd');
	res = await cmd.find({}, {
		projection: {
			'_id': 0,
			name: 1
		}
	}).toArray();
	client.close()
	console.log(res)
	return res
}

async function getDocByName(name) {
	await client.connect();
	const cmd = client.db('test').collection('cmd');
	res = await cmd.findOne({
		name
	});
	client.close()
	console.log(res)
	return res
}

async function test() {
	console.log("測試查詢所有數據")
	var res1 = await getAllCmdName()
	console.log(res1)
	console.log("根據名稱查詢數據")
	var res2 = await getDocByName("ls")
	console.log(res2)
}

//getAllCmdName()
getDocByName("99號設備")

module.exports = {
	getAllCmdName,
	getDocByName
}
