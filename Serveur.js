const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');

app.use(express.static('public'));
app.use(bodyParser());
app.use(upload());

//home//
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Connexion

app.post('/Connexion', (req, res) => {

console.log("Req :", req.body);

const name = req.body.name;
const password = req.body.Password;

console.log(name);
console.log(password);

let obj = {"login":[{"user": name,"password": password}]};
 
console.log(obj);

let data = JSON.stringify(obj);
console.log(obj);
fs.writeFileSync('public/login.json', data);

res.redirect('/');

});

//ADD Vidéo

app.post('/upload',function(req,res){
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + '/public/uploads/' + name;
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
      }
      else {
        console.log("File Uploaded",name);
      }
    });
  }
  else {
    res.end();
  };
  
  //add to json

console.log("Req :", req.body);

//Json File

var Titre = req.body.Titre;
var Text = req.body.Text;

var d = new Date();

var Dates = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} : ${d.getHours()}h${d.getMinutes()}`;

//Json write

	fs.readFile('public/login.json', 'utf-8', function(err, data) {
		if (err) throw err

		var arrayOfObjects = JSON.parse(data)
		arrayOfObjects.video.push({
			files: name,
			titre: Titre,
			text: Text,
			date: Dates
		})

		console.log(arrayOfObjects)

		fs.writeFile('public/login.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
			if (err) throw err
				console.log('Done!')
		})
	})

  res.redirect('/');
});

//Serveur
app.listen(3000);