import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Visita, VisitaRelations, Casa} from '../models';
import {CasaRepository} from './casa.repository';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.id,
  VisitaRelations
> {

  public readonly casa: BelongsToAccessor<Casa, typeof Visita.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CasaRepository') protected casaRepositoryGetter: Getter<CasaRepository>,
  ) {
    super(Visita, dataSource);
    this.casa = this.createBelongsToAccessorFor('casa', casaRepositoryGetter,);
    this.registerInclusionResolver('casa', this.casa.inclusionResolver);
  }
}
