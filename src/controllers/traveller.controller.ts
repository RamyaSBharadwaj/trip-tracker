import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Traveller } from '../models';
import { TravellerRepository } from '../repositories';

export class TravellerController {
  constructor(
    @repository(TravellerRepository)
    public travellerRepository: TravellerRepository,
  ) { }

  // Post Trip details
  @post('/v1/travel', {
    responses: {
      '201': {
        description: 'Traveller model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Traveller } } },
      },
    },
  })
  async create(@requestBody() traveller: Traveller): Promise<Traveller> {
    return await this.travellerRepository.create(traveller);
  }

  // Get all trip details
  @get('/v1/travel', {
    responses: {
      '200': {
        description: 'Array of Traveller model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Traveller } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Traveller)) filter?: Filter,
  ): Promise<Traveller[]> {
    return await this.travellerRepository.find(filter);
  }

  @get('/v1/travel/{tripName}', {
    responses: {
      '200': {
        description: 'Object of Traveller',
      },
    },
  })
  async findPlaces(
    @param.path.string('tripName') tripName?: string,
    // @param.query.string('placeName') placeName?: string,
  ): Promise<Traveller[]> {
    let tripDetails = await this.travellerRepository.find({
      where: {
        tripName: tripName,
        // places: {
        //   elemMatch: {
        //     placeName: placeName
        //   }
        // }
      },
    })
    return tripDetails
  }

  @patch('/v1', {
    responses: {
      '200': {
        description: 'Traveller PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() traveller: Traveller,
    @param.query.object('where', getWhereSchemaFor(Traveller)) where?: Where,
  ): Promise<Count> {
    return await this.travellerRepository.updateAll(traveller, where);
  }

  @get('/v1/{id}', {
    responses: {
      '200': {
        description: 'Traveller model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Traveller } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Traveller> {
    return await this.travellerRepository.findById(id);
  }

  @patch('/v1/{id}', {
    responses: {
      '204': {
        description: 'Traveller PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() traveller: Traveller,
  ): Promise<void> {
    await this.travellerRepository.updateById(id, traveller);
  }

  @put('/v1/{id}', {
    responses: {
      '204': {
        description: 'Traveller PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() traveller: Traveller,
  ): Promise<void> {
    await this.travellerRepository.replaceById(id, traveller);
  }

  @del('/v1/{id}', {
    responses: {
      '204': {
        description: 'Traveller DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.travellerRepository.deleteById(id);
  }
}
