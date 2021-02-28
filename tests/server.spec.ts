import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/server';
import { IProcessEnv } from '../src/types';
import { randStr } from '../src/utils';

chai.use(chaiHttp);
chai.should();

let app;

before(async () => {
  const penv: IProcessEnv = { ...process.env };
  penv.TYPEORM_CONNECTION = 'sqlite';
  penv.TYPEORM_DATABASE   = ':memory:';
  const result = await server(penv, false);
  app = result.httpServer;
});

describe('server', async () => {

  it('GET /api/health should return basic data', (done) => {
    chai.request(app)
      .get('/api/health')
      .end((err, res) => {
        console.log('HEALTH', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  let truckId = '', parcelId = '', truck;

  it('GET /api/trucks should return truck list', (done) => {
    chai.request(app)
      .get('/api/trucks')
      .end((err, res) => {
        console.log('TRUCKS', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('POST /api/trucks should create truck', (done) => {
    const truckData = {
      reg: randStr(10),
      make: 'MAKE-1',
      model: 'MODEL-A',
      emptyWeight: '1234',
    };
    chai.request(app)
      .post('/api/trucks')
      .send(truckData)
      .end((err, res) => {
        console.log('NEW TRUCK', res.body);
        truck = res.body.data;
        truckId = truck.id;
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PUT /api/trucks should create truck', (done) => {
    const truckData = {
      reg: truck.reg + '-2',
      make: 'MAKE-2',
      model: 'MODEL-2',
    };
    chai.request(app)
      .put('/api/trucks/' + truckId)
      .send(truckData)
      .end((err, res) => {
        console.log('UPDATED TRUCK', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/trucks/:truckId should return truck data', (done) => {
    chai.request(app)
      .get('/api/trucks/' + truckId + '?withParcels=1')
      .end((err, res) => {
        console.log('TRUCK', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('POST /api/trucks/:truckId/parcels should create parcel', (done) => {
    const parcelData = {
      weight: '10',
    };
    chai.request(app)
      .post('/api/trucks/' + truckId + '/parcels')
      .send(parcelData)
      .end((err, res) => {
        console.log('NEW PARCEL', res.body);
        parcelId = res.body.data.id;
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  // get truck data again and check updated loadedWeight and parcelCount
  it('GET /api/trucks/:truckId should return updated truck data', (done) => {
    chai.request(app)
      .get('/api/trucks/' + truckId + '?withParcels=1')
      .end((err, res) => {
        console.log('UPDATED TRUCK', res.body);
        const truck = res.body.data;
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(truck.loadedWeight).to.equal(1244);
        expect(truck.parcelCount).to.equal(1);
        done();
      });
  });

  it('DELETE /api/trucks/:truckId/parcels/:parcelId should delete parcel', (done) => {
    chai.request(app)
      .del('/api/trucks/' + truckId + '/parcels/' + parcelId)
      .end((err, res) => {
        console.log('DELETED PARCEL', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  // get truck data again and check updated loadedWeight and parcelCount
  it('GET /api/trucks/:truckId should return updated truck data', (done) => {
    chai.request(app)
      .get('/api/trucks/' + truckId + '?withParcels=1')
      .end((err, res) => {
        console.log('TRUCK', res.body);
        const truck = res.body.data;
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(truck.loadedWeight).to.equal(1234);
        expect(truck.parcelCount).to.equal(0);
        done();
      });
  });

  it('DELETE /api/trucks/:truckId should delete truck', (done) => {
    chai.request(app)
      .delete('/api/trucks/' + truckId)
      .end((err, res) => {
        console.log('DELETED TRUCK', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  // get truck data again, it should be null
  it.skip('GET /api/trucks/:truckId should return no truck data', (done) => {
    chai.request(app)
      .get('/api/trucks/' + truckId)
      .end((err, res) => {
        console.log('TRUCK', res.body);
        const truck = res.body.data;
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(truck).to.equal(null);
        done();
      });
  });
});