const { MongoClient } = require("mongodb")
const url = "mongodb+srv://samtest:test123@cluster0.qdrpw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//其中一種寫法
//URL 解析 和引擎配置
// MongoClient.connect(url,function(err,db){
//     if (err) throw err;
//     var dbo = db.db("test")
//     var myobj = {name:"laowu",type:"學生",like:["打球","看youtube","玩遊戲"]}
//     dbo.collection("devices").insertOne(myobj,function(err,res){
//         if (err) throw err;
//         console.log("文件插入成功")
//         db.close()
//     })
// })
//-----------------------------------------------------------------

//插入資料
client.connect(err=>{
    if (err) throw err;
    console.log("數據連接成功")
    const collection = client.db("test").collection("my-test")
    //var myobj = {name:"laowu",type:"學生",like:["打球","看youtube","玩遊戲"]}
    var myobj = [{name:"laowu1",type:"學生",like:["打球","看youtube","玩遊戲"]},{name:"laowu2",type:"學生",like:["打球","看youtube","玩遊戲"]}]
    collection.insertMany(myobj,function(err,res){
        if(err) return console.log("插入失敗")
        console.log("插入的文檔數為:"+res.insertedCount)
        client.close()
    })
})


//find方法
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    const collection = client.db("test").collection("my-test")
    collection.find({}).toArray((err,result) => {
        if (err) throw err;
        console.log(result)
        client.close()
    })
})

//查找單一筆資料
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    const collection = client.db("test").collection("my-test")
    //var wherestr = {name:"laowu1"}
    var wherestr = {name:{$in:["laowu1","laowu2"]}}
    collection.find(wherestr).toArray((err, result) => {
        if (err) throw err;
        console.log(result)
        client.close()
    })
})

//更新一筆數據
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    const collection = client.db("test").collection("my-test")
    var wherestr = {name:{$in:["laowu2"]}}
    var updatestr = {$set:{"type":"新鮮人"}}
    collection.updateOne(wherestr,updatestr,
        (err, result) => {
        if (err) throw err;
        console.log("文檔更新成功")
        console.log(result)
        client.close()
    })
})

//更新多筆數據
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    const collection = client.db("test").collection("my-test")
    var wherestr = {name:{$in:["laowu2"]}}
    var updatestr = {$set:{"type":"社會人"}}
    collection.updateMany(wherestr,updatestr,
        (err, result) => {
        if (err) throw err;
        console.log("文檔更新成功")
        console.log(result.modifiedCount+"個文檔被更新")
        client.close()
    })
})

//排序
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    const collection = client.db("test").collection("my-test")
    //var wherestr = {name:{$in:["laowu2"]}}
    //var updatestr = {$set:{"type":"社會人"}}
    var sortstr = {_id:1}
    collection.find().sort(sortstr).limit(2).toArray((err,result)=>{
        if (err) throw err;
        console.log(result)
        client.close()
    })
})

//刪除單筆
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    const collection = client.db("test").collection("my-test")
    //var wherestr = {name:{$in:["laowu2"]}}
    //var updatestr = {$set:{"type":"社會人"}}
    // var sortstr = {_id:1}
    var wherestr = {"name":"laowu2"}
    collection.deleteOne(wherestr,(err,result)=>{
        if (err) throw err;
        console.log("刪除成功")
        client.close()
    })
})

//刪除多筆
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    const collection = client.db("test").collection("my-test")
    var wherestr = { "name": "laowu2" }
    collection.deleteMany(wherestr, (err, result) => {
        if (err) throw err;
        console.log("刪除成功")
        client.close()
    })
})

//增加一個表資料
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    //增加一個表
    const collection = client.db("test").collection("order-test")
    var obj = {_id:1,product_id:154,status:1}
    collection.insertOne(obj,(err,result)=>{
        if (err) throw err;
        console.log("文件插入成功")
        client.close()
    })
})

//增加第二個表資料
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    //增加第二個表
    const collection = client.db("test").collection("products")
    var obj = [{_id:154,name:"筆記型電腦"},{_id:155,name:"耳機"},{_id:156,name:"台式電腦"}]
    collection.insertMany(obj,(err,result)=>{
        if (err) throw err;
        console.log("文件插入成功，數量為"+result.insertedCount)
        client.close()
    })
})

//上面兩個表聯表查詢
client.connect(err => {
    if (err) throw err;
    console.log("數據連接成功")
    //增加第二個表 返回結果 [{"_id":1,"product_id":154,"status":1,"orderdetails":[{"_id":154,"name":"筆記型電腦"}]}]
    const collection = client.db("test").collection("order-test")
    collection.aggregate([
        {
            $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "orderdetails" }
        }
    ]).toArray((err, result) => {
        if (err) throw err;
        console.log(JSON.stringify(result[0]))
        client.close()
    })
})