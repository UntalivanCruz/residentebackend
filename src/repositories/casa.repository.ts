import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Casa, CasaRelations, Visita, HabitantesCasa} from '../models';
import {VisitaRepository} from './visita.repository';
import {HabitantesCasaRepository} from './habitantes-casa.repository';

export class CasaRepository extends DefaultCrudRepository<
  Casa,
  typeof Casa.prototype.id,
  CasaRelations
> {

  public readonly visitas: HasManyRepositoryFactory<Visita, typeof Casa.prototype.id>;

  public readonly habitantesCasas: HasManyRepositoryFactory<HabitantesCasa, typeof Casa.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>, @repository.getter('HabitantesCasaRepository') protected habitantesCasaRepositoryGetter: Getter<HabitantesCasaRepository>,
  ) {
    super(Casa, dataSource);
    this.habitantesCasas = this.createHasManyRepositoryFactoryFor('habitantesCasas', habitantesCasaRepositoryGetter,);
    this.registerInclusionResolver('habitantesCasas', this.habitantesCasas.inclusionResolver);
    this.visitas = this.createHasManyRepositoryFactoryFor('visitas', visitaRepositoryGetter,);
    this.registerInclusionResolver('visitas', this.visitas.inclusionResolver);
  }
}
