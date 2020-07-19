const Concert = require('../../models/concert.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const initData = {
  performer: 'test',
  genre: 'test',
  price: 20,
  day: 1,
  image: 'test',
}

describe('Concert', () => {
  it('should throw an error if not set required arg', () => {
    const concert = new Concert({});

    concert.validate(err => {
      expect(err).to.exist;
    });
  });

  it('should throw an error if "performer", "genre", or "image" is not a string', () => {
    const data = {...initData};
    const fields = ['performer', 'genre', 'image'];
    const cases = [{}, []];
    for(let field of fields) {
      for(let item of cases) {
        data[field] = item;
        const concert = new Concert(data);
        concert.validate(err => {
          expect(err).to.exist;
        })
      }
    }
  })

  it('should throw an error if "price" or "day" is not a number', () => {
    const data = {...initData};
    const cases = [{}, [], function(){}, 'text'];
    for(let item of cases) {
      data.price = item;
      data.day = item;
      const concert = new Concert(data);
      concert.validate(err => {
        expect(err).to.exist;
      })
    }
  })

  it('should not throw any error if args are correct', () => {
    const concert = new Concert(initData);
    concert.validate(err => {
      expect(err).to.not.exist;
    });
  })
});