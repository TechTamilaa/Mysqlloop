import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Anime, AnimeRelations} from '../models';

export class AnimeRepository extends DefaultCrudRepository<
  Anime,
  typeof Anime.prototype.id,
  AnimeRelations
> {
  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource,
  ) {
    super(Anime, dataSource);
  }
}
