import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HabitantesCasa,
  Casa,
} from '../models';
import {HabitantesCasaRepository} from '../repositories';

export class HabitantesCasaCasaController {
  constructor(
    @repository(HabitantesCasaRepository)
    public habitantesCasaRepository: HabitantesCasaRepository,
  ) { }

  @get('/habitantes-casas/{id}/casa', {
    responses: {
      '200': {
        description: 'Casa belonging to HabitantesCasa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Casa)},
          },
        },
      },
    },
  })
  async getCasa(
    @param.path.string('id') id: typeof HabitantesCasa.prototype.id,
  ): Promise<Casa> {
    return this.habitantesCasaRepository.casa(id);
  }
}
