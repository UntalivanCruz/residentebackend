import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {HabitantesCasa, HabitantesCasaRelations, Casa, Residente} from '../models';
import {CasaRepository} from './casa.repository';
import {ResidenteRepository} from './residente.repository';

export class HabitantesCasaRepository extends DefaultCrudRepository<
  HabitantesCasa,
  typeof HabitantesCasa.prototype.id,
  HabitantesCasaRelations
> {

  public readonly casa: BelongsToAccessor<Casa, typeof HabitantesCasa.prototype.id>;

  public readonly residente: BelongsToAccessor<Residente, typeof HabitantesCasa.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CasaRepository') protected casaRepositoryGetter: Getter<CasaRepository>, @repository.getter('ResidenteRepository') protected residenteRepositoryGetter: Getter<ResidenteRepository>,
  ) {
    super(HabitantesCasa, dataSource);
    this.residente = this.createBelongsToAccessorFor('residente', residenteRepositoryGetter,);
    this.registerInclusionResolver('residente', this.residente.inclusionResolver);
    this.casa = this.createBelongsToAccessorFor('casa', casaRepositoryGetter,);
    this.registerInclusionResolver('casa', this.casa.inclusionResolver);
  }
}
