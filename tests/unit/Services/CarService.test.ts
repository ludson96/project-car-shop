import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import {
  validCarInput,
  validCarOutput,
  validAllCarsOutput,
  validId,
  invalidId,
} from './mock/CarServiceMock';
import Car from '../../../src/Domains/Car';

const SUCESS = 'Com sucesso';

describe('Testando endpoint /cars', () => {
  let carService: CarService;

  beforeEach(() => {
    carService = new CarService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Criar um carro (post)', () => {
    it(SUCESS, async () => {
      const carOutput = new Car(validCarOutput);
      vi.spyOn(Model, 'create').mockResolvedValue(carOutput as any);

      const result = await carService.create(validCarInput);

      expect(result).toEqual(carOutput);
    });

    it('Caso input seja vazio', async () => {
      vi.spyOn(Model, 'create').mockResolvedValue(null as any);

      const result = await carService.create(validCarInput);

      expect(result).toBeNull();
    });
  });

  describe('Listando todos os carros, endpoint "/cars" (get)', () => {
    it(SUCESS, async () => {
      vi.spyOn(Model, 'find').mockResolvedValue(validAllCarsOutput as any);

      const result = await carService.getAllCars();

      expect(result).toEqual(validAllCarsOutput);
    });
  });

  describe('Listando carro específico, endpoint "/cars/:id" (get)', () => {
    it(SUCESS, async () => {
      vi.spyOn(Model, 'findById').mockResolvedValue(validCarOutput as any);

      const result = await carService.getCarById(validId);

      expect(result).toEqual(validCarOutput);
    });

    it('Caso o id seja invalido', async () => {
      await expect(
        carService.getCarById('eu sou um id invalido'),
      ).rejects.toThrow('Invalid mongo id');
    });

    it('Caso o id não exista no banco', async () => {
      vi.spyOn(Model, 'findById').mockResolvedValue(null as any);
      await expect(carService.getCarById(invalidId)).rejects.toThrow('Car not found');
    });
  });

  describe('Atualizando carros, endpoint "/cars/:id (put)"', () => {
    it(SUCESS, async () => {
      vi.spyOn(Model, 'findByIdAndUpdate').mockResolvedValue(validCarOutput as any);

      const result = await carService.updateCar(validId, validCarOutput);

      expect(result).toEqual(validCarOutput);
    });

    it('Caso o id seja invalido', async () => {
      await expect(
        carService.updateCar('eu sou um id invalido', validCarOutput),
      ).rejects.toThrow('Invalid mongo id');
    });

    it('Caso o id não exista no banco', async () => {
      vi.spyOn(Model, 'findByIdAndUpdate').mockResolvedValue(null as any);
      await expect(
        carService.updateCar(invalidId, validCarOutput),
      ).rejects.toThrow('Car not found');
    });
  });
});