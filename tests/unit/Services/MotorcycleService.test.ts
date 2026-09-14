import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Model } from 'mongoose';
import MotorcyclesService from '../../../src/Services/MotorcyclesService';
import {
  validMotoInput,
  validMotoOutput,
  validAllMotoOutput,
  validId,
  invalidId,
} from './mock/MotorcyclesServiceMock';
import Motorcycle from '../../../src/Domains/Motorcycle';

const SUCESS = 'Com sucesso';

describe('Testando endpoint /motorcycles', () => {
  let motoService: MotorcyclesService;

  beforeEach(() => {
    motoService = new MotorcyclesService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Criar uma moto (post)', () => {
    it(SUCESS, async () => {
      const motoOutput = new Motorcycle(validMotoOutput);
      vi.spyOn(Model, 'create').mockResolvedValue(motoOutput as any);

      const result = await motoService.create(validMotoInput);

      expect(result).toEqual(motoOutput);
    });

    it('Caso input seja vazio', async () => {
      vi.spyOn(Model, 'create').mockResolvedValue(null as any);

      const result = await motoService.create(validMotoInput);

      expect(result).toBeNull();
    });
  });

  describe('Listando todos as moto, endpoint "/motorcycles" (get)', () => {
    it(SUCESS, async () => {
      vi.spyOn(Model, 'find').mockResolvedValue(validAllMotoOutput as any);

      const result = await motoService.getAllMoto();

      expect(result).toEqual(validAllMotoOutput);
    });
  });

  describe('Listando moto específica, endpoint "/motorcycles/:id" (get)', () => {
    it(SUCESS, async () => {
      vi.spyOn(Model, 'findById').mockResolvedValue(validMotoOutput as any);

      const result = await motoService.getMotoById(validId);

      expect(result).toEqual(validMotoOutput);
    });

    it('Caso o id seja invalido', async () => {
      await expect(
        motoService.getMotoById('eu sou um id invalido'),
      ).rejects.toThrow('Invalid mongo id');
    });

    it('Caso o id não exista no banco', async () => {
      vi.spyOn(Model, 'findById').mockResolvedValue(null as any);
      await expect(motoService.getMotoById(invalidId)).rejects.toThrow('Motorcycle not found');
    });
  });

  describe('Atualizando moto, endpoint "/motorcycles/:id (put)"', () => {
    it(SUCESS, async () => {
      vi.spyOn(Model, 'findByIdAndUpdate').mockResolvedValue(validMotoOutput as any);

      const result = await motoService.updateMoto(validId, validMotoOutput);

      expect(result).toEqual(validMotoOutput);
    });

    it('Caso o id seja invalido', async () => {
      await expect(
        motoService.updateMoto('eu sou um id invalido', validMotoOutput),
      ).rejects.toThrow('Invalid mongo id');
    });

    it('Caso o id não exista no banco', async () => {
      vi.spyOn(Model, 'findByIdAndUpdate').mockResolvedValue(null as any);
      await expect(
        motoService.updateMoto(invalidId, validMotoOutput),
      ).rejects.toThrow('Motorcycle not found');
    });
  });
});