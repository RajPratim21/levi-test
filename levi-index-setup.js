var levi = require('levi')
 
// levi instance of database path `db` 
var lv = levi('db') 
.use(levi.tokenizer())
.use(levi.stemmer())
.use(levi.stopword())

lv.put('a', 'Lorem Ipsum is simply dummy text.' //,function (err) { ... }
	)
 
// object fields as value 
lv.put('b', {
  id: 'b',
  title: 'Lorem Ipsum',
  body: 'Dummy text of the printing and typesetting industry.'
}//, function (err) { ... }
)
 
// options.fields 
lv.put('c', {
  id: 'c',
  title: 'Hello World',
  body: 'Bla bla bla'
}, {
  fields: { title: true } // index title only 
})

//reading from json file and preparing the data.
  //json data is in the form 
  /*
      {
        title:
        paragraph: {
                      context:
                      question:{....}
                      answer:  {.....}
                    }
      }

      convering the above json format into
        {
          _id: 
          context:
        }

  */
  const fs = require('fs')
 
  fs.readFile('./train-v1.1.json', function (err, data) {
  if (err) throw err;

  var raw = JSON.parse(data);
  var questions = raw.data.map(function (q) {
   i = i+1;
      ans = q.paragraphs.map(function(r){
        //console.log(r.context)
          return {
            context: (r.context)
          }
      });
   
    return {
      id: i.toString(),
      title: q.title,
      context: JSON.parse(JSON.stringify(ans)),
    };
  });

  var i=0, j=0,k=0;
  var jsonArr = [];

  for(i=0;i<questions.length;i++)
  {
    for(j=0;j<questions[i].context.length;j++)
    {
      k++;
      //pushing  the data to levi index
      lv.put( k.toString() , questions[i].context[j].context)
		var data = {
		        _id: k.toString(),
		        context: questions[i].context[j].context
	 	       }
      //);
   	  	  
    }
  }
  	

});
