import request from 'supertest'
import app from '../../index'
import User, { IUser } from '../../models/User'
import Request, { IRequest } from '../../models/Request'

afterAll(async () => {
  await User.deleteMany()
  await Request.deleteMany()
})

describe('User Routes', () => {
  describe('POST /auth/register', () => {
    test('should return a 400 status code if the request body is invalid', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({})

      expect(res.status).toBe(400)
    })

    test('should return 400 status code for not entering required inputs: firstName', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          lastName: 'Doe',
          username: 'johndoe',
          password: 'password123',
          passwordConfirm: 'password123',
          age: 25,
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'Male'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Firstname is required')
    })

    test('should return 400 status code for not entering required inputs: lastName', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          username: 'johndoe',
          password: 'password123',
          passwordConfirm: 'password123',
          age: 25,
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'Male'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Lastname is required')
    })

    test('should return 400 status code for not entering required inputs: username', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          password: 'password123',
          passwordConfirm: 'password123',
          age: 25,
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'Male'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Username is required')
    })

    test('should return 400 status code for not entering required inputs: password', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          passwordConfirm: 'password123',
          age: 25,
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'Male'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Password is required')
    })

    test('should return 400 status code for not entering required inputs: passwordConfirm', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          password: 'password123',
          age: 25,
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'Male'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('PasswordConfirm is required')
    })

    test('should return 400 status code for different password and passwordConfirm', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          password: 'password123',
          passwordConfirm: 'password124',
          age: 25,
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'Male'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Password and Password confirmation do not match')
    })

    test('should return 400 status code for invalid age', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          password: 'password123',
          passwordConfirm: 'password123',
          age: 'invalid',
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'Male'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Age is invalid')
    })

    test('should return 400 status code for invalid gender', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          password: 'password123',
          passwordConfirm: 'password123',
          age: 25,
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'invalid'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Gender is invalid')
    })

    test('should create a new user and return a 201 status code if the request body is valid', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          password: 'password123',
          passwordConfirm: 'password123',
          age: 25,
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'Male'
        })

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('firstName', 'John')
      expect(res.body).toHaveProperty('lastName', 'Doe')
      expect(res.body).toHaveProperty('username', 'johndoe')
      expect(res.body).toHaveProperty('age', 25)
      expect(res.body).toHaveProperty('phone', '+1234567890')
      expect(res.body).toHaveProperty('country', 'USA')
      expect(res.body).toHaveProperty('city', 'New York')
      expect(res.body).toHaveProperty('gender', 'Male')
    })

    test('should return 400 status code for invalid gender', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          password: 'password123',
          passwordConfirm: 'password123',
          age: 25,
          phone: '+1234567890',
          country: 'USA',
          city: 'New York',
          gender: 'Male'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Username already exists')
    })
  })

  describe('POST /auth/login', () => {
    let user: IUser
    beforeAll(async () => {
      // create a user to use for the login tests
      user = new User({
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        password: 'password123',
        age: 30,
        phone: '+1234567890',
        country: 'USA',
        city: 'Los Angeles',
        gender: 'Female'
      })

      await user.save()
    })

    test('should return a 400 status code if the request body is invalid', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({})

      expect(res.status).toBe(400)
    })

    test('should return a 401 status code if the username or password is incorrect', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          username: 'janedoe',
          password: 'incorrectpassword'
        })

      expect(res.status).toBe(401)
    })

    it('should return a token if the username and password are correct', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'janedoe', password: 'password123' })
        .expect(200)
      expect(response.body).toHaveProperty('token')
      expect(response.body.token).not.toBeUndefined()
    })

    it('should return an error if the username is not found', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'nonexistent', password: 'password123' })
        .expect(401)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toBe('Invalid username or password')
    })

    it('should return an error if the password is incorrect', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'janedoe', password: 'wrongpassword' })
        .expect(401)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toBe('Invalid username or password')
    })
  })

  describe("POST /user/search", () => {
    let token: string
    beforeAll(async () => {
      const users = [
        {
          firstName: "Megan",
          lastName: "Fox",
          username: "megan",
          password: "password",
          age: 31,
          country: "USA",
          gender: "Female",
        },
        {
          firstName: "Anna",
          lastName: "Petrova",
          username: "anna",
          password: "password",
          age: 25,
          country: "Canada",
          gender: "Female",
        },
        {
          firstName: "Parsa",
          lastName: "Tohidi",
          username: "parsath",
          password: "password",
          age: 24,
          country: "Canada",
          gender: "Male",
        }
      ]
      await User.insertMany(users)

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'janedoe', password: 'password123' })

      token = response.body.token
    })

    it("should return users with matching username", async () => {
      const res = await request(app)
        .get("/user/search?username=johndoe")
        .set('token', token)
      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toEqual(1)
      expect(res.body[0].username).toEqual("johndoe")
    })

    it("should return users with matching first name", async () => {
      const res = await request(app)
        .get("/user/search?firstName=Jane")
        .set('token', token)
      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toEqual(0)
    })

    it("should return users with matching last name", async () => {
      const res = await request(app)
        .get("/user/search?age=25")
        .set('token', token)
      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toEqual(2)
      expect(res.body[0].lastName).toEqual("Doe")
      expect(res.body[1].lastName).toEqual("Petrova")
    })
  })
})

describe('Request Routes', () => {
  let token: string
  let tokenAnotherUser: string
  let anotherUser: IUser
  let sentRequest: IRequest
  beforeAll(async () => {
    anotherUser = await User.findOne({ username: 'johndoe' }) as IUser
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'janedoe', password: 'password123' })

    token = response.body.token

    const response2 = await request(app)
      .post('/auth/login')
      .send({ username: 'johndoe', password: 'password123' })

    tokenAnotherUser = response2.body.token
  })

  describe('POST /request/send', () => {
    test('should return a 401 error if the user is not authenticated', async () => {
      const response = await request(app)
        .post('/request/send')
        .send({
          receiverId: 'someUserId',
        })
      expect(response.statusCode).toBe(401)
    })

    test('should return a 500 error if the "receiverId" is not in correct mongodb _id format', async () => {
      const response = await request(app)
        .post('/request/send')
        .set('token', token)
        .send({
          receiverId: 'wrongeId'
        })

      expect(response.statusCode).toBe(500)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Internal server error')
    })

    test('should return a request', async () => {
      const response = await request(app)
        .post('/request/send')
        .set('token', token)
        .send({ receiverId: anotherUser._id })
        .expect(201)
      sentRequest = response.body
      expect(response.body.receiverId.toString()).toBe(anotherUser._id.toString())
      expect(response.body.status).toBe('pending')
    })

  })

  describe('DELETE /request/cancel', () => {
    test('should return a 404 error if the requestid is wrong', async () => {
      const response = await request(app)
        .delete('/request/cancel')
        .set('token', token)
        .send({
          requestId: anotherUser._id
        })

      expect(response.statusCode).toBe(404)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Pending friend request does not exist')
    })

    test('should return cancel friend request', async () => {
      const response = await request(app)
        .delete('/request/cancel')
        .set('token', token)
        .send({ requestId: sentRequest._id })
        .expect(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Pending friend request cancelled')
    })

  })

  describe('POST /request/respond', () => {
    beforeAll(async () => {
      const response = await request(app)
        .post('/request/send')
        .set('token', token)
        .send({ receiverId: anotherUser._id })

      sentRequest = response.body
    })
    test('should return a 400 error if the state is invalid', async () => {

      const response = await request(app)
        .post('/request/respond')
        .set('token', tokenAnotherUser)
        .send({
          status: 'invalid',
        })
      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Invalid status')
    })

    test('should return a 200 and return updated request', async () => {
      const response = await request(app)
        .post('/request/respond')
        .set('token', tokenAnotherUser)
        .send({
          requestId: sentRequest._id,
          status: 'accepted'
        })

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('status')
      expect(response.body.status).toBe('accepted')
    })

    test('should return a 400 error if the pending request not found', async () => {
      const response = await request(app)
        .post('/request/respond')
        .set('token', token)
        .send({
          requestId: sentRequest._id,
          status: 'accepted'
        })

      expect(response.statusCode).toBe(404)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Pending friend request does not exist')
    })

  })

  describe('POST /request/remove', () => {
    test('should return a request', async () => {
      const response = await request(app)
        .post('/request/remove')
        .set('token', token)
        .send({ friendId: anotherUser._id })
        .expect(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Friend removed successfully')
    })

  })

  describe('GET /request/list', () => {
    test('should return a request', async () => {
      const response = await request(app)
        .get('/request/list')
        .set('token', token)
        .expect(200)
      expect(response.body.length).toBe(1)
    })

  })

})
