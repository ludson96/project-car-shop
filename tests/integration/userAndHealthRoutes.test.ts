import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

const TEST_EMAIL = 'john@example.com';

const mockUser = {
  _id: '634852326b35b59438fbea21',
  id: '634852326b35b59438fbea21',
  name: 'John Doe',
  email: TEST_EMAIL,
  password: 'hashedpassword',
  role: 'customer',
};

describe('Integração: Rotas de Usuário (/users) e Health (/health)', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('GET /health - deve retornar status do sistema', async function () {
    const res = await request(app).get('/health');
    expect(res.status).to.be.oneOf([200, 503]);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('services');
  });

  it('POST /users/register - deve validar e registrar um novo usuário (201)', async function () {
    sinon.stub(Model, 'findOne').resolves(null);
    sinon.stub(Model, 'create').resolves(mockUser);

    const res = await request(app)
      .post('/users/register')
      .send({
        name: 'John Doe',
        email: TEST_EMAIL,
        password: 'password123',
      });

    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('token');
    expect(res.body.user.email).to.be.equal(TEST_EMAIL);
  });

  it('POST /users/login - deve logar com credenciais corretas (200)', async function () {
    sinon.stub(Model, 'findOne').resolves(mockUser);
    sinon.stub(bcrypt, 'compare').resolves(Boolean(true));

    const res = await request(app)
      .post('/users/login')
      .send({
        email: TEST_EMAIL,
        password: 'password123',
      });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('token');
  });
});
