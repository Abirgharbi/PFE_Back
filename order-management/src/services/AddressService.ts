import { Address } from '../models/addressModel';
import { IAddressService } from '../interfaces/IAddressService';

export class AddressService implements IAddressService {
  async getAddress(addressId: string): Promise<any> {
    return await Address.find({ addressId }).sort({ createdAt: -1 });
  }
}
