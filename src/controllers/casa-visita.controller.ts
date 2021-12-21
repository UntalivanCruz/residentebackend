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
  Visita,
} from '../models';
import {CasaRepository} from '../repositories';

export class CasaVisitaController {
  constructor(
    @repository(CasaRepository) protected casaRepository: CasaRepository,
  ) { }

  @get('/casas/{id}/visitas', {
    responses: {
      '200': {
        description: 'Array of Casa has many Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visita>,
  ): Promise<Visita[]> {
    return this.casaRepository.visitas(id).find(filter);
  }

  @post('/casas/{id}/visitas', {
    responses: {
      '200': {
        description: 'Casa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Casa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {
            title: 'NewVisitaInCasa',
            exclude: ['id'],
            optional: ['casaId']
          }),
        },
      },
    }) visita: Omit<Visita, 'id'>,
  ): Promise<Visita> {
    return this.casaRepository.visitas(id).create(visita);
  }

  @patch('/casas/{id}/visitas', {
    responses: {
      '200': {
        description: 'Casa.Visita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {partial: true}),
        },
      },
    })
    visita: Partial<Visita>,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.casaRepository.visitas(id).patch(visita, where);
  }

  @del('/casas/{id}/visitas', {
    responses: {
      '200': {
        description: 'Casa.Visita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.casaRepository.visitas(id).delete(where);
  }
}
