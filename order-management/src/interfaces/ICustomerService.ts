export interface ICustomerService {
  findCustomerById(id: string): Promise<any>;
}
