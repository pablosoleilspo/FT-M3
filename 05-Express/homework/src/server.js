// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1 ;

const server = express();
// to enable parsing of json bodies for post requests
// IMPORTANTE SI VAMOS A TRABAJAR POR REQ.BODY ES DECIR recibir info por body----
//no nos podemos olvidar de activar el MIDDLEWARE de express json()
server.use(express.json());


//SIEMPRE VA ASI server.METHOD(URL, (req, res, next) => {})

// TODO: your code to handle requests                          (  1)
const PATH = '/posts';
server.post(PATH, (req, res) => {
    // se puede let author = req.body.author etc
    const {author, title, contents} = req.body;

   if(!author || !title || !contents){
       return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
   }

const post = {
     author, title, contents, id: id++
};
posts.push(post);
res.status(200).json(post);

})

server.post(`${PATH}/author/:author`, (req, res) => {                      // (2)
    // req.params -> objetoooo
    // let author = req.params.author
    let {author} = req.params;
    let {title, contents} = req.body;
    // let title = req.body.title
    //let contents = req.body.contents

    if(!author || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }

    const post = {
        author, title, contents, id: id++
   };
   posts.push(post);
   res.status(200).json(post);
})

server.get(PATH, (req, res) => {                         //(3)
    let {term} = req.query;
    // si term no vino por query, term = undefined
    // si term vino por query, term = valor que se haya pasado 
    if(term){
        const term_posts = posts.filter(p => p.title.includes(term) || p.contents.includes(term))
        return res.json(term_posts)
    }
  res.json(posts)
})

server.get(`${PATH}/:author`, (req, res) => {        //(4)
    let {author} = req.params
  // filter que devuelva un nuevo arreglo con la coincidencia de author
  const posts_author = posts.filter(p => p.author === author)
  if(posts_author.length > 0){
           res.json(posts_author)
  }
  else{
     return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
  }
})

server.get(`${PATH}/:author/:title`, (req, res) => {  //(5)
let {author, title} = req.params;

if(author && title){

    const new_posts = posts.filter(p => p.author === author && p.title === title);
    if(new_posts.length > 0){
        res.json(new_posts);
    }else{
     res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }
}
else{
    res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
}

})

server.put(PATH, (req, res) => {                 //(6)
let {id, title, contents} = req.body
if(id && title && contents){
    // find devuelve el primer elemento que coincida
    //comol el id es unico deberia de encontrar un unico elemento con el id pasado por body
    // voy a usar find que me va a devolver lo que espero 
    let post = posts.find(p => p.id === parseInt(id)) //Convierte una cadena en un número entero
    if(post){
        post.title = title;
        post.contents = contents;
        res.json(post);
    }
    else{
        res.status(STATUS_USER_ERROR).json({error: "No se escontró el id necesario"})
    }
}
else{
    res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
}
})

server.delete(PATH, (req, res) => {
    let {id} = req.body;

    const post = posts.find((p) => p.id === parseInt(id));
    if(!id || !post){
        res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
    posts = posts.filter(p => p.id !== parseInt(id))

    return res.json({success: true})
})

server.delete('/author', (req, res) => {
    let {author} = req.body;

    const author_found = posts.find((p) => p.author === author);
    if(!author || !author_found){
       return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }
    let delete_authors = [];
    //op1 
    //delete_authors = posts.filter(p => p.author === author)
    //posts = posts.filter(p => p.author !== author)

   //op2
 posts = posts.filter( p => {
    if(p.author !== author){
        return true;
    }else{
        delete_authors.push(p);
    }
 })
 return res.json(delete_authors);
})


module.exports = { posts, server };


// por req.params -> tenes que definirlo en la ruta es mas exacta  tiene que venir el termino si o si 
// por req.query -> no tiene que definirse en la ruta es mucho mas flexible puede o no venir el termino 