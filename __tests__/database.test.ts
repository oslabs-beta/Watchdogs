import request from 'supertest';
import app from '../server/server';
const server = 'http://localhost:3000';

describe ('Testing Suite for Routes', ()=> {
  const testUser = 'jest'
  const testPass = 'jest'
  const testArn = 'jest'
 
  describe ('POST /signup', () => {
      afterEach(() => request(server)
      .delete('/api/user')
      .send({username: testUser})
      )
    it('Responds with a 200 status code', () => request(server)
      .post('/api/signup')
      .send({username: testUser, password: testPass, arn: testArn})
      .expect(200)
    )
    it('Responds with a json object', () => request(server)
    .post('/api/signup')
    .send({username: testUser, password: testPass, arn: testArn})
    .then(response => {
      expect(response.type).toEqual('application/json')
    })
  )

    it('Sucsessfully creates a user in the database', () => request(server)
    .post('/api/signup')
    .send({username: testUser, password: testPass, arn: testArn})
    .then(response => {
      expect(response.body.user.username).toEqual(testUser)
      expect(response.body.user.password).not.toEqual(testPass)
      expect(response.body.user.arn).toEqual(testArn)
    }) 
    )
    
    it('Adds a cookie in the response header', () => request(server)
      .post('/api/signup')
      .send({username: testUser, password: testPass, arn: testArn})
      .then(response => {
        expect(response.headers['set-cookie'].length).toEqual(1)
      })
    )
  })

  describe ('POST /login', () => {

    beforeAll(() => request(server)
    .post('/api/signup')
    .send({username: testUser, password: testPass, arn: testArn})
    )
    afterAll(() => request(server)
    .delete('/api/user')
    .send({username: testUser})
    )
    it('Responds with a 200 status code', () => request(server)
    .post('/api/login')
    .send({username: testUser, password: testPass})
    .expect(200)
      
    )

    it("Response with a json object", () => request(server)
    .post('/api/login')
    .send({username: testUser, password: testPass})
    .then(response => {
      expect(response.type).toEqual('application/json')
    })
    )
    it("Response with the matching user and matching:true boolean", () => request(server)
    .post('/api/login')
    .send({username: testUser, password: testPass})
    .then(response => {
      expect(response.body.user.username).toEqual(testUser)
      expect(response.body.user.password).not.toEqual(testPass)
      expect(response.body.user.arn).toEqual(testArn)
      expect(response.body.match).toBe(true)
    })
    )

    it('Adds a session cookie in the response header', () => request(server)
    .post('/api/login')
    .send({username: testUser, password: testPass})
    .then(response => {
      expect(response.headers['set-cookie'].length).toEqual(1)
    })
    )

    it("If input is invalid, responds with a 200 status code and 'Incorrect username and/or password.'", () => request(server)
    .post('/api/login')
    .send({username: testUser, password: 'invalid'})
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json')
      expect(response.body.message).toEqual('Incorrect username and/or password.')
    })
    )
    
  })
  
    xdescribe ('GET /user', () => {

      it('Responds with a 200 status code', () => {
        
      })
  
      it('Responds with a JSON object', () => {
  
      })

      it('Responds with the users data', () => {
        
      })

  })

    xdescribe ('PUT /user', () => {

      it('Responds with a 200 status code', () => {
        
      })

      it('Responds with a JSON object', () => {

      })

      it('Responds with the updated users data', () => {
        
      })

  })
  xdescribe ('DELETE /user', () => {
    it ('Responds with a 200 status code', () => {

    })
    it('Responds with a JSON object', () => {

    })

    it('Responds with the deleted users data', () => {
      
    })

  })
  
})