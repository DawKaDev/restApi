const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const initData = {
  _id: '5d9f1140f10a81216cfd4408',
  performer: 'Performer 1', 
  genre: '5d9f1140f10a81216cfd4408', 
  price: 20, 
  day: 1, 
  image: 'image.png'};

describe('DELETE /api/concerts', () => {
  before(async () => {
    const item = new Concert(initData);
    await item.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/:id should remove document by :id', async () => {
    const res = await request(server).delete('/api/concerts/5d9f1140f10a81216cfd4408');
    const deleted = await Concert.findById('5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deleted).to.be.null;
  })
})