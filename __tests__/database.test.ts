import request from 'supertest';
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
  
    describe ('GET /user', () => {

      let userId:string;

      beforeAll(() => request(server)
      .post('/api/signup')
      .send({username: testUser, password: testPass, arn: testArn})
      .then(response => {
        userId = response.body.user._id
        })
      )

      afterAll(() => request(server)
      .delete('/api/user')
      .send({username: testUser})
      )

      it('Responds with a 200 status code', () => request(server)
      .get('/api/user')  
      .set('Cookie', `userId=${userId}`)
      .expect(200)
      )
  
      it('Responds with a JSON object', () => request(server)
      .get('/api/user')  
      .set('Cookie', `userId=${userId}`)
      .then(response => {
        expect(response.type).toEqual('application/json')
      })
      )

      it('Responds with the users data', () => request(server)
      .get('/api/user')  
      .set('Cookie', `userId=${userId}`)
      .then(response => {
        expect(response.body.username).toEqual(testUser)
        expect(response.body.password).not.toEqual(testPass)
        expect(response.body.arn).toEqual(testArn)
        })
      )

  })

    describe ('PUT /user', () => {

      beforeAll(() => request(server)
      .post('/api/signup')
      .send({username: testUser, password: testPass, arn: testArn})
      )

      afterAll(() => request(server)
      .delete('/api/user')
      .send({username: testUser})
      )

      it('Responds with a 200 status code', () => request(server)
      .put('/api') 
      .send({username: testUser, arn: testArn}) 
      .expect(200)
      )

      it('Responds with a JSON object', () => request(server)
      .put('/api') 
      .send({username: testUser, arn: testArn}) 
      .then(response => {
        expect(response.type).toEqual('application/json')
      })
      )

      it('Responds with the updated users data', () => request(server)
      .put('/api')
      .send({username: testUser, arn: 'updatedArn'})
      .then(response => {
        expect (response.body.username).toEqual(testUser);
        expect(response.body.arn).not.toEqual(testArn)
        expect(response.body.arn).toEqual('updatedArn')
      })   
      )

  })
  describe ('DELETE /user', () => {


    beforeEach(() => request(server)
    .post('/api/signup')
    .send({username: testUser, password: testPass, arn: testArn})
    )

    it ('Responds with a 200 status code', () => request(server)
    .delete('/api/user')
    .send({username: testUser})
    .expect(200)

    )
    it('Responds with a JSON object', () => request(server)
    .delete('/api/user')
    .send({username: testUser})
    .then(response => {
      expect(response.type).toEqual('application/json')
    })

    )

    it('Responds with the deleted users data', () => request(server)
    .delete('/api/user')
    .send({username: testUser})
    .then(response => {
      expect(response.body.username).toEqual(testUser)
      expect(response.body.password).not.toEqual(testPass)
      expect(response.body.arn).toEqual(testArn)
      })  
    )

   
  })
  
})