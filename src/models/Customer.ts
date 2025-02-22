import { dbInsert } from '@/services/dbService'
import { CustomerInputModel, CustomerModel } from './models'

export default class Customer {
  static insert(customer: CustomerInputModel): CustomerModel {
    dbInsert('customers', customer)

    return {
      //
    }
  }
}
