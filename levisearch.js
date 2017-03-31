var levi = require('levi')
 
// levi instance of database path `db` 
var lv = levi('db') 
.use(levi.tokenizer())
.use(levi.stemmer())
.use(levi.stopword())

var t0 = new Date().getTime()
	lv.searchStream('two picks of the 2011 draft').toArray(function (results) { //console.log(results) // highland method
  	var t1 = new Date().getTime()
  	console.log((t1-t0) +' milliseconds')
  })


//lv.searchStream('lorem Ipsum').toArray(function (results) { console.log(results)}) // highland method
  



/*
 lv.searchStream('international airport', {
  fields: { context: 10, '*': 1 } // title field boost. '*' means any field
}).toArray(function (results) { console.log(results)})
*/