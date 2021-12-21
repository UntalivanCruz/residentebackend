import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Casa} from './casa.model';

@model()
export class Visita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaEntrada: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaSalida: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Casa)
  casaId: string;

  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;
