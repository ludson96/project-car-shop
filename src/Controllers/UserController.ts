import { Request, Response, NextFunction } from 'express';
import UserService from '../Services/UserService';

export default class UserController {
  private service: UserService;

  constructor(service: UserService = new UserService()) {
    this.service = service;
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.login(req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
