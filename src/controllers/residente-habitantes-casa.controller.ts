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
  Residente,
  HabitantesCasa,
} from '../models';
import {ResidenteRepository} from '../repositories';

export class ResidenteHabitantesCasaController {
  constructor(
    @repository(ResidenteRepository) protected residenteRepository: ResidenteRepository,
  ) { }

  @get('/residentes/{id}/habitantes-casas', {
    responses: {
      '200': {
        description: 'Array of Residente has many HabitantesCasa',
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
    return this.residenteRepository.habitantesCasas(id).find(filter);
  }

  @post('/residentes/{id}/habitantes-casas', {
    responses: {
      '200': {
        description: 'Residente model instance',
        content: {'application/json': {schema: getModelSchemaRef(HabitantesCasa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Residente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitantesCasa, {
            title: 'NewHabitantesCasaInResidente',
            exclude: ['id'],
            optional: ['residenteId']
          }),
        },
      },
    }) habitantesCasa: Omit<HabitantesCasa, 'id'>,
  ): Promise<HabitantesCasa> {
    return this.residenteRepository.habitantesCasas(id).create(habitantesCasa);
  }

  @patch('/residentes/{id}/habitantes-casas', {
    responses: {
      '200': {
        description: 'Residente.HabitantesCasa PATCH success count',
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
    return this.residenteRepository.habitantesCasas(id).patch(habitantesCasa, where);
  }

  @del('/residentes/{id}/habitantes-casas', {
    responses: {
      '200': {
        description: 'Residente.HabitantesCasa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HabitantesCasa)) where?: Where<HabitantesCasa>,
  ): Promise<Count> {
    return this.residenteRepository.habitantesCasas(id).delete(where);
  }
}
