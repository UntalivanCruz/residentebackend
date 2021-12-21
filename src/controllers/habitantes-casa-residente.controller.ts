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
  Residente,
} from '../models';
import {HabitantesCasaRepository} from '../repositories';

export class HabitantesCasaResidenteController {
  constructor(
    @repository(HabitantesCasaRepository)
    public habitantesCasaRepository: HabitantesCasaRepository,
  ) { }

  @get('/habitantes-casas/{id}/residente', {
    responses: {
      '200': {
        description: 'Residente belonging to HabitantesCasa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Residente)},
          },
        },
      },
    },
  })
  async getResidente(
    @param.path.string('id') id: typeof HabitantesCasa.prototype.id,
  ): Promise<Residente> {
    return this.habitantesCasaRepository.residente(id);
  }
}
