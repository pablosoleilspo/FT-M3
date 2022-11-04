var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]


// Escribí acá tu servidor
http.createServer(function(req, res){
// api muestra el arreglo completo
if(req.url === '/api'){
  res.writeHead(200, {'Content-Type':'application/json'})
  return res.end( JSON.stringify(beatles) )
}

// req.url "/api/John%20Lennon" john
// req.url "/api/paul%20mccarthhey" john

if(req.url.substring(0, 5) === '/api/'){
  // ===> /api/John%20Lennon.split('/') ---> ['api', 'John%20Lennon' ].pop() ---> John%20Lennon
const beatle = req.url.split('/').pop() 
const found = beatles.find(b => encodeURI(b.name) === beatle) //encodeURI('pablo vasqquez') --> lo pasa a 'pablo%20vasqaeuz' y decodeURI('pablo%20vasqaeuz') ----> 'pablo vasqquez'
if(found){
  res.writeHead(200, {'Content-Type':'application/json'})
  return res.end(JSON.stringify(found))
}
res.writeHead(404, {'Content-Type':'text/plain'})
return res.end(`${decodeURI(beatle)} no es un integrante de la banda`)
}

if(req.url === '/'){
  fs.readFile('./index.html', function(err, data){
    if(err){
      res.writeHead(404, {'Content-Type':'text/plain'})
      return res.end('lo siento pana')
    }
    res.writeHead(200, {'Content-Type':'text/html'})
    return res.end(data)
  })
}

if(req.url.length > 1){
const beatle = req.url.split('/').pop() 
const found = beatles.find(b => encodeURI(b.name) === beatle)
if(found){
fs.readFile('./beatle.html', 'utf-8', function(err, data){
if(err){
  res.writeHead(404, {'Content-Type':'text/plain'})
  return res.end('lo siento pana')
}
//remplazo
data = data.replace('{name}', found.name)
data = data.replace('{birthdate}', found.birthdate)
data = data.replace('{profilePic}', found.profilePic)
res.writeHead(200, {'Content-Type':'text/html'})
return res.end(data)
})
}
else{
 res.writeHead(404, {'Content-Type':'text/plain'})
      return res.end('lo siento pana')
}

}


}).listen(3000, '127.0.0.1')

//El método find ejecuta la función callback una vez por cada índice del array hasta que encuentre uno en el que el callback devuelva un valor verdadero.
