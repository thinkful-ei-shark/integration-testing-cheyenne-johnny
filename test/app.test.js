const app = require('../app');
// require test libraries
const supertest = require('supertest');
const { expect } = require('chai');

// begin tests
describe('testing for app module', () => {
  // route testing
  it('should return status 200 and array of apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
      });
  });
  it('should return status 400 due to wrong route', () => {
    return supertest(app)
      .get('/app')
      .expect(404);
  });
  // query testing
  it('testing genere', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'action' })
      .expect(200);
  });

  it('should return status 200 with sort query', () => {
    return supertest(app)
      .get('/apps')
      .query({sort: 'rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });

  it('should return status 400 when passed an incorrect query for "genre" ', () => {
    return supertest(app)
      .get('/apps')
      .query({genre: 'test'})
      .expect(400, 'Genre must be one of the following : action, puzzle, strategy, casual, arcade, card');
  });

  it('should return status 400 when passed an incorrect query for "sort"', () => {
    return supertest(app)
      .get('/apps')
      .query({sort: 'test'})
      .expect(400, 'Sort must be one of rating or app');
  });

  // testing query data handle functions
  it('test genre filter', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'action' })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        let response = true;
        let i = 0;
        while (i < res.body.length - 1) {
          const appAtI = res.body[i];
          if (!appAtI.Genres.includes('Action')) {
            response = false;
            break;
          }
          i++;
        }
        expect(response).to.be.true;
      });
  });

  it('should sort based on passed query', () => {
    return supertest(app)
      .get('/apps')
      .query({sort: 'rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let response = true;
        let i = 0;
        while(i < res.body.length -1) {
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          if(appAtIPlus1.Rating < appAtI.Rating ) {
            response = false;
            break;
          }
          i++;
        }
        expect(response).to.be.true;
      });
  });
});
