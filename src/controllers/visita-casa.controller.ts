import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Visita,
  Casa,
} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaCasaController {
  constructor(
    @repository(VisitaRepository)
    public visitaRepository: VisitaRepository,
  ) { }

  @get('/visitas/{id}/casa', {
    responses: {
      '200': {
        description: 'Casa belonging to Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Casa)},
          },
        },
      },
    },
  })
  async getCasa(
    @param.path.string('id') id: typeof Visita.prototype.id,
  ): Promise<Casa> {
    return this.visitaRepository.casa(id);
  }
}
