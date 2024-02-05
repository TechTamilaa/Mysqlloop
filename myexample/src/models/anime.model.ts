import {Entity, model, property} from '@loopback/repository';

@model()
export class Anime extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Animename: string;

  @property({
    type: 'string',
    required: true,
  })
  Type: string;

  @property({
    type: 'number',
    required: true,
  })
  favrating: number;


  constructor(data?: Partial<Anime>) {
    super(data);
  }
}

export interface AnimeRelations {
  // describe navigational properties here
}

export type AnimeWithRelations = Anime & AnimeRelations;
