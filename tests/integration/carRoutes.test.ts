import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '../../src/app';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_jwt_car_shop_portfolio_key';
const adminToken = jwt.sign(
  { id: '634852326b35b59438fbea21', role: 'admin', email: 'admin@carshop.com' },
  JWT_SECRET,
);
const customerToken = jwt.sign(
  { id: '634852326b35b59438fbea22', role: 'customer', email: 'customer@carshop.com' },
  JWT_SECRET,
);

const mockCar = {
  _id: '634852326b35b59438fbea2f',
  model: 'Civic LX',
  year: 2020,
  color: 'Silver',
  status: true,
  buyValue: 90000,
  doorsQty: 4,
  seatsQty: 5,
};

describe('Integração: Rotas de Carros (/cars)', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('GET /cars - deve listar todos os carros sem autenticação', async function () {
    sinon.stub(Model, 'find').resolves([mockCar]);

    const res = await request(app).get('/cars');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].model).to.be.equal('Civic LX');
  });

  it('POST /cars - deve bloquear requisição sem token (401)', async function () {
    const res = await request(app)
      .post('/cars')
      .send({
        model: 'Civic LX',
        year: 2020,
        color: 'Silver',
        buyValue: 90000,
        doorsQty: 4,
        seatsQty: 5,
      });

    expect(res.status).to.be.equal(401);
    expect(res.body.message).to.be.equal('Token not found');
  });

  it('POST /cars - deve bloquear usuário não admin com 403 Forbidden', async function () {
    const res = await request(app)
      .post('/cars')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        model: 'Civic LX',
        year: 2020,
        color: 'Silver',
        buyValue: 90000,
        doorsQty: 4,
        seatsQty: 5,
      });

    expect(res.status).to.be.equal(403);
    expect(res.body.message).to.include('Admin access required');
  });

  it('POST /cars - deve rejeitar payload inválido com Zod (400)', async function () {
    const res = await request(app)
      .post('/cars')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        model: 'C',
        year: 1800,
        buyValue: -50,
      });

    expect(res.status).to.be.equal(400);
    expect(res.body.message).to.be.equal('Validation failed');
    expect(res.body.errors).to.be.an('array');
  });

  it('POST /cars - deve criar carro com sucesso para admin (201)', async function () {
    sinon.stub(Model, 'create').resolves(mockCar);

    const res = await request(app)
      .post('/cars')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        model: 'Civic LX',
        year: 2020,
        color: 'Silver',
        status: true,
        buyValue: 90000,
        doorsQty: 4,
        seatsQty: 5,
      });

    expect(res.status).to.be.equal(201);
    expect(res.body.model).to.be.equal('Civic LX');
  });
});
