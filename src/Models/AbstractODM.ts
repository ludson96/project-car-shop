import { model, Model, models, Schema, UpdateQuery, FilterQuery } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(input: T): Promise<T> {
    return this.model.create({ ...input });
  }

  public async update(_id: string, input: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id },
      { ...input } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async getPaginated(
    filter: Record<string, unknown> = {},
    page = 1,
    limit = 10,
    sort: Record<string, 1 | -1> = {},
  ): Promise<{ data: T[]; total: number; page: number; totalPages: number; limit: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model
        .find(filter as FilterQuery<T>)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.model
        .countDocuments(filter as FilterQuery<T>)
        .exec(),
    ]);

    return {
      data: data as unknown as T[],
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      limit,
    };
  }

  public async getById(_id: string): Promise<T | null> {
    return this.model.findById(_id);
  }

  public async delete(_id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(_id).exec();
  }
}