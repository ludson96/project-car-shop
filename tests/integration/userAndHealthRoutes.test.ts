import { describe, it, expect, afterEach, vi } from 'vitest';
import request from 'supertest';
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

describe('Integração: Rotas de Usuário (/users) e Health (/health)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('GET /health - deve retornar status do sistema', async () => {
    const res = await request(app).get('/health');
    expect([200, 503]).toContain(res.status);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('services');
  });

  it('POST /users/register - deve validar e registrar um novo usuário (201)', async () => {
    vi.spyOn(Model, 'findOne').mockResolvedValue(null);
    vi.spyOn(Model, 'create').mockResolvedValue(mockUser as any);

    const res = await request(app)
      .post('/users/register')
      .send({
        name: 'John Doe',
        email: TEST_EMAIL,
        password: 'password123',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(TEST_EMAIL);
  });

  it('POST /users/login - deve logar com credenciais corretas (200)', async () => {
    vi.spyOn(Model, 'findOne').mockResolvedValue(mockUser as any);
    vi.spyOn(bcrypt, 'compare').mockResolvedValue(true as any);

    const res = await request(app)
      .post('/users/login')
      .send({
        email: TEST_EMAIL,
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
