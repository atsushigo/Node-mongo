找出devId比3大的資料
db.devices.find({devId:{$gte:3}})
找出頁面devId小於三
 db.devices.find({devId:{$lte:3}})
找出devId是3或4的資料 
db.devices.find({devId:{$in:[3,4]}})
找出devId不是3且不是4的資料 
db.devices.find({devId:{$nin:[1,2]}})
找出不是devId不大於3的資料
db.devices.find({devId:{$not:{$gt:3}}})
找出name格中字串有“資料”兩字的
db.devices.find({name:{$regex:/資料/ig}})
找出devId大於2且name是測試資料的
db.devices.find({devId:{$gt:2},name:{$in:["測試資料"]}})
找出devId大於3的貨name是二號設備的
db.devices.find({$or:[{devId:{$gt:3}},{name:{$in:["2號設備"]}}],})
頁面常用邏輯 sort是降序
db.devices.find().skip(10).limit(5).sort({devId:-1})

————修改
db.devices.update({name:"測試資料1"},{$set:{devId:99}})
增加數字的話
db.devices.update({name:"測試資料1"},{$inc:{devId:2}})
刪除特定資料格內容: 有點奇怪的地方是還要指定devId數字
db.devices.update({name:"測試資料1"},{$inc:{devId:2}})

——新增一格
db.devices.update({name:"測試資料1"},{$push:{nickname:"測試資料1暱稱"}})

——刪除一筆資料
db.devices.deleteOne({devId:5})
指定一筆而已(justOne)
db.devices.deleteOne({devId:5},{justOne:true})

