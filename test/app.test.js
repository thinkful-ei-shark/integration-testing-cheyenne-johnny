const app = require('../app');
// require test libraries
const supertest = require('supertest');
const { expect } = require('chai');

// begin tests
describe('testing for app module', () => {
  it('should return status 200 and array of apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });
});