import { DefaultCrudRepository } from '@loopback/repository';
import { Traveller } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TravellerRepository extends DefaultCrudRepository<
  Traveller,
  typeof Traveller.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Traveller, dataSource);
  }


}
