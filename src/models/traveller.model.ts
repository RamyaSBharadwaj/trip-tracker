import { Entity, model, property } from '@loopback/repository';

@model({ settings: { "strict": false } })
export class Traveller extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  tripName?: string;

  @property({
    type: 'string'
  })
  tripStartDate: string;

  @property({
    type: 'string'
  })
  tripEndDate: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  places?: object[];


  // @property.array(String, {
  //   name: 'places'
  // })

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Traveller>) {
    super(data);
  }
}
