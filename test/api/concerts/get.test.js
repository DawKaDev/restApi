const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const initData = [
  {_id: '5d9f1140f10a81216cfd4408', performer: 'Performer 1', genre: '5d9f1140f10a81216cfd4408', price: 20, day: 1, image: 'image.png'},
  {_id: '5d9f1140f10a81216cfd4409', performer: 'Performer 2', genre: '5d9f1140f10a81216cfd4408', price: 25, day: 2, image: 'image.png'}
]

describe('GET /api/concerts', () => {
  before(async () => {
    for(let item of initData) {
      const concert = new Concert(item);
      await concert.save();
    }
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return one concert by :id', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/performer/:performer it should return concerts by :performer', async () => {
    const res = await request(server).get('/api/concerts/performer/Performer 1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/genre/:genre it should return concerts by :genre', async () => {
    const res = await request(server).get('/api/concerts/genre/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/price/:price_min/:price_max it should return concerts by :price_min and :price_max', async () => {
    const res = await request(server).get('/api/concerts/price/20/25');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/day/:day it should return concerts by :day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
});