const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () => 
      agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
      }));
        
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').send({a: 2, b: 3}).expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').send({a: 2, b: 3}).expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));
    it('responds with and object with message `test`', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));

      //falta testear si da false
      it('Tiene que dar false en caso de que la suma no sea entre el mismo numero', () => {
        agent.post('/sumArray').send({array: [1, 2, 3, 4], num: 100 }).then(res => expect(res.body.result).toEqual(false))
      })
      //testear que no se sume el mism numero
      it('No se deberia sumar el mismo numero', ()=> {
        agent.post('/sumArray').send({array: [1, 2, 3, 4], num: 2}) //no podria suma 2 veces 1
        .then(
          res => expect(res.body.result).toEqual(false)
        )
      })
  });

  describe('POST /numString', ()=> {
    it('responde con status 200', ()=> {
      return agent.post('/numString').send({str: 'test'}).expect(200)
    })
    it('Responder con 4 si enviamos hola', ()=> {
      return agent.post('/numString').send({str: 'hola'}).then(
        res => expect(res.body.result).toEqual(4)
      )
    })
    it('Responder con un status 400 si el string es un número', ()=> {
      agent.post('/numString').send({str : 7}).expect(400)
    })
    // it('Responder con un status 400 si el string esta vacio', ()=> {
    //   agent.post('/numString').send({ str : ''}).expect(400)
    // })

  })

//pluck
  describe('POST /pluck', ()=> {
    it('Responder con status 200', ()=> {
      agent.post('/pluck').send({array: [{name: 'Jimmy'}, {name: 'Liz'}, {name: 'Andres'}], name: 'name'}).expect(200)
    })
    it('Responder con la funcionalidad del pluck', () => {
      agent.post('/pluck').send({array: [{name: 'Jimmy'}, {name: 'Liz'}, {name: 'Andres'}], name: 'name'})
      .then(res => expect(res.body.result).toEqual(['Jimmy', 'Liz', 'Andres']))
    })
    it('Responder con un status 400 si array no es un arreglo.', ()=> {
      agent.post('/pluck').send({array: 'pepe', name: 'name'}). expect(400)
    })
    it('Responder con un status 400  si el string propiedad está vacio', ()=> {
      agent.post('/pluck').send({array: [{name: 'Jimmy'}, {name: 'Liz'}, {name: ' Andres'}], name: ''}).expect(400)
    })

  })


});

