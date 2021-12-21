import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Residente, ResidenteRelations, HabitantesCasa} from '../models';
import {HabitantesCasaRepository} from './habitantes-casa.repository';

export class ResidenteRepository extends DefaultCrudRepository<
  Residente,
  typeof Residente.prototype.id,
  ResidenteRelations
> {

  public readonly habitantesCasas: HasManyRepositoryFactory<HabitantesCasa, typeof Residente.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('HabitantesCasaRepository') protected habitantesCasaRepositoryGetter: Getter<HabitantesCasaRepository>,
  ) {
    super(Residente, dataSource);
    this.habitantesCasas = this.createHasManyRepositoryFactoryFor('habitantesCasas', habitantesCasaRepositoryGetter,);
    this.registerInclusionResolver('habitantesCasas', this.habitantesCasas.inclusionResolver);
  }
}
