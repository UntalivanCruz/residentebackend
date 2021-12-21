import {Entity, model, property, hasMany} from '@loopback/repository';
import {Visita} from './visita.model';
import {HabitantesCasa} from './habitantes-casa.model';

@model({settings: {strict: false}})
export class Casa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  numero: number;

  @property({
    type: 'number',
    required: true,
  })
  bloque: number;

  @property({
    type: 'number',
    required: true,
  })
  calle: number;

  @property({
    type: 'string',
  })
  referencia?: string;

  @hasMany(() => Visita)
  visitas: Visita[];

  @hasMany(() => HabitantesCasa)
  habitantesCasas: HabitantesCasa[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Casa>) {
    super(data);
  }
}

export interface CasaRelations {
  // describe navigational properties here
}

export type CasaWithRelations = Casa & CasaRelations;
