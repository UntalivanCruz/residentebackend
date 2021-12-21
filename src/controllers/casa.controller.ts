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
import {Casa} from '../models';
import {CasaRepository} from '../repositories';

export class CasaController {
  constructor(
    @repository(CasaRepository)
    public casaRepository : CasaRepository,
  ) {}

  @post('/casas')
  @response(200, {
    description: 'Casa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Casa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Casa, {
            title: 'NewCasa',
            exclude: ['id'],
          }),
        },
      },
    })
    casa: Omit<Casa, 'id'>,
  ): Promise<Casa> {
    return this.casaRepository.create(casa);
  }

  @get('/casas/count')
  @response(200, {
    description: 'Casa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Casa) where?: Where<Casa>,
  ): Promise<Count> {
    return this.casaRepository.count(where);
  }

  @get('/casas')
  @response(200, {
    description: 'Array of Casa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Casa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Casa) filter?: Filter<Casa>,
  ): Promise<Casa[]> {
    return this.casaRepository.find(filter);
  }

  @patch('/casas')
  @response(200, {
    description: 'Casa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Casa, {partial: true}),
        },
      },
    })
    casa: Casa,
    @param.where(Casa) where?: Where<Casa>,
  ): Promise<Count> {
    return this.casaRepository.updateAll(casa, where);
  }

  @get('/casas/{id}')
  @response(200, {
    description: 'Casa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Casa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Casa, {exclude: 'where'}) filter?: FilterExcludingWhere<Casa>
  ): Promise<Casa> {
    return this.casaRepository.findById(id, filter);
  }

  @patch('/casas/{id}')
  @response(204, {
    description: 'Casa PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Casa, {partial: true}),
        },
      },
    })
    casa: Casa,
  ): Promise<void> {
    await this.casaRepository.updateById(id, casa);
  }

  @put('/casas/{id}')
  @response(204, {
    description: 'Casa PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() casa: Casa,
  ): Promise<void> {
    await this.casaRepository.replaceById(id, casa);
  }

  @del('/casas/{id}')
  @response(204, {
    description: 'Casa DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.casaRepository.deleteById(id);
  }
}
