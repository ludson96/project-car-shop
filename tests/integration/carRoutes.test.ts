import { describe, it, expect, afterEach, vi } from 'vitest';
import request from 'supertest';
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

describe('Integração: Rotas de Carros (/cars)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('GET /cars - deve listar todos os carros sem autenticação', async () => {
    vi.spyOn(Model, 'find').mockResolvedValue([mockCar] as any);

    const res = await request(app).get('/cars');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].model).toBe('Civic LX');
  });

  it('POST /cars - deve bloquear requisição sem token (401)', async () => {
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

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Token not found');
  });

  it('POST /cars - deve bloquear usuário não admin com 403 Forbidden', async () => {
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

    expect(res.status).toBe(403);
    expect(res.body.message).toContain('Admin access required');
  });

  it('POST /cars - deve rejeitar payload inválido com Zod (400)', async () => {
    const res = await request(app)
      .post('/cars')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        model: 'C',
        year: 1800,
        buyValue: -50,
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Validation failed');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('POST /cars - deve criar carro com sucesso para admin (201)', async () => {
    vi.spyOn(Model, 'create').mockResolvedValue(mockCar as any);

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

    expect(res.status).toBe(201);
    expect(res.body.model).toBe('Civic LX');
  });
});
