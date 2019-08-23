import * as request from 'supertest';
import './common/env';
import Server from './common/server';

const app = new Server().getServer().build();

app.listen(process.env.PORT);

describe('nxplorerjs-microservice: routes spec', () => {
  it('should get 200 response from home page', done => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should get 200 response example', done => {
    request(app)
      .get('/api/v1/examples')
      .expect(200)
      .expect(res => {
        res.body =
          "[{'id': 0, 'name': 'example 0'}, {'id': 1, 'name': 'example 1'}]";
      })
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should get 404 from unknown route', done => {
    request(app)
      .get('/asodkoasd9923942ik3koadskoaksda9isd')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });
});
