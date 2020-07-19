const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const initData = {performer: 'Performer 1', genre: '5d9f1140f10a81216cfd4408', price: 20, day: 1, image: 'image.png'};

describe('POST /api/concerts', () => {
  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should insert new document to db', async () => {
    const res = await request(server).post('/api/concerts').send(initData);
    const newDoc = await Concert.findOne({performer: initData.performer});
    expect(res.status).to.be.equal(200);
    expect(newDoc).to.not.be.null;
    expect(newDoc.performer).to.be.equal(initData.performer);
  })
})