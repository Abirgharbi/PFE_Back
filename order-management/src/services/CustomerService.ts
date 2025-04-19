import { Customer } from '../models/customer';
import { ICustomerService } from '../interfaces/ICustomerService';

export class CustomerService implements ICustomerService {
  async findCustomerById(id: string): Promise<any> {
    return await Customer.findOne({ customerId: id });
  }
}
