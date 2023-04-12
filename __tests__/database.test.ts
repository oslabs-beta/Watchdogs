import request from 'supertest';
import app from '../server/server';

describe('Testing Suite for Routes', () => {
  describe('POST /signup', () => {
    it('Responds with a 302 (redirect) status code', () => {});

    it('Sucsessfully creates a user in the database', () => {});

    it('Adds a session cookie in the response header', () => {});
  });

  describe('POST /login', () => {
    it('Responds with a 302 (redirect) status code', () => {});

    it("Redirects to '/home'", () => {});

    it('Adds a session cookie in the response header', () => {});

    it("If input is invalid, responds with a 200 status code and 'Incorrect username and/or password.'", () => {});
  });

  describe('GET /user', () => {
    it('Responds with a 200 status code', () => {});

    it('Responds with a JSON object', () => {});

    it('Responds with the users data', () => {});
  });

  describe('PUT /user', () => {
    it('Responds with a 200 status code', () => {});

    it('Responds with a JSON object', () => {});

    it('Responds with the updated users data', () => {});
  });
});
