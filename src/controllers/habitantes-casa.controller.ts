import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {HabitantesCasa} from '../models';
import {HabitantesCasaRepository} from '../repositories';

export class HabitantesCasaController {
  constructor(
    @repository(HabitantesCasaRepository)
    public habitantesCasaRepository : HabitantesCasaRepository,
  ) {}

  @post('/habitantes-casas')
  @response(200, {
    description: 'HabitantesCasa model instance',
    content: {'application/json': {schema: getModelSchemaRef(HabitantesCasa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitantesCasa, {
            title: 'NewHabitantesCasa',
            exclude: ['id'],
          }),
        },
      },
    })
    habitantesCasa: Omit<HabitantesCasa, 'id'>,
  ): Promise<HabitantesCasa> {
    return this.habitantesCasaRepository.create(habitantesCasa);
  }

  @get('/habitantes-casas/count')
  @response(200, {
    description: 'HabitantesCasa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HabitantesCasa) where?: Where<HabitantesCasa>,
  ): Promise<Count> {
    return this.habitantesCasaRepository.count(where);
  }

  @get('/habitantes-casas')
  @response(200, {
    description: 'Array of HabitantesCasa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HabitantesCasa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HabitantesCasa) filter?: Filter<HabitantesCasa>,
  ): Promise<HabitantesCasa[]> {
    return this.habitantesCasaRepository.find(filter);
  }

  @patch('/habitantes-casas')
  @response(200, {
    description: 'HabitantesCasa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitantesCasa, {partial: true}),
        },
      },
    })
    habitantesCasa: HabitantesCasa,
    @param.where(HabitantesCasa) where?: Where<HabitantesCasa>,
  ): Promise<Count> {
    return this.habitantesCasaRepository.updateAll(habitantesCasa, where);
  }

  @get('/habitantes-casas/{id}')
  @response(200, {
    description: 'HabitantesCasa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HabitantesCasa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HabitantesCasa, {exclude: 'where'}) filter?: FilterExcludingWhere<HabitantesCasa>
  ): Promise<HabitantesCasa> {
    return this.habitantesCasaRepository.findById(id, filter);
  }

  @patch('/habitantes-casas/{id}')
  @response(204, {
    description: 'HabitantesCasa PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitantesCasa, {partial: true}),
        },
      },
    })
    habitantesCasa: HabitantesCasa,
  ): Promise<void> {
    await this.habitantesCasaRepository.updateById(id, habitantesCasa);
  }

  @put('/habitantes-casas/{id}')
  @response(204, {
    description: 'HabitantesCasa PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() habitantesCasa: HabitantesCasa,
  ): Promise<void> {
    await this.habitantesCasaRepository.replaceById(id, habitantesCasa);
  }

  @del('/habitantes-casas/{id}')
  @response(204, {
    description: 'HabitantesCasa DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.habitantesCasaRepository.deleteById(id);
  }
}
