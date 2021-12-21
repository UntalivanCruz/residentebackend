import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Casa,
  HabitantesCasa,
} from '../models';
import {CasaRepository} from '../repositories';

export class CasaHabitantesCasaController {
  constructor(
    @repository(CasaRepository) protected casaRepository: CasaRepository,
  ) { }

  @get('/casas/{id}/habitantes-casas', {
    responses: {
      '200': {
        description: 'Array of Casa has many HabitantesCasa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HabitantesCasa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HabitantesCasa>,
  ): Promise<HabitantesCasa[]> {
    return this.casaRepository.habitantesCasas(id).find(filter);
  }

  @post('/casas/{id}/habitantes-casas', {
    responses: {
      '200': {
        description: 'Casa model instance',
        content: {'application/json': {schema: getModelSchemaRef(HabitantesCasa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Casa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitantesCasa, {
            title: 'NewHabitantesCasaInCasa',
            exclude: ['id'],
            optional: ['casaId']
          }),
        },
      },
    }) habitantesCasa: Omit<HabitantesCasa, 'id'>,
  ): Promise<HabitantesCasa> {
    return this.casaRepository.habitantesCasas(id).create(habitantesCasa);
  }

  @patch('/casas/{id}/habitantes-casas', {
    responses: {
      '200': {
        description: 'Casa.HabitantesCasa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitantesCasa, {partial: true}),
        },
      },
    })
    habitantesCasa: Partial<HabitantesCasa>,
    @param.query.object('where', getWhereSchemaFor(HabitantesCasa)) where?: Where<HabitantesCasa>,
  ): Promise<Count> {
    return this.casaRepository.habitantesCasas(id).patch(habitantesCasa, where);
  }

  @del('/casas/{id}/habitantes-casas', {
    responses: {
      '200': {
        description: 'Casa.HabitantesCasa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HabitantesCasa)) where?: Where<HabitantesCasa>,
  ): Promise<Count> {
    return this.casaRepository.habitantesCasas(id).delete(where);
  }
}
