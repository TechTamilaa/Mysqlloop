import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Anime} from '../models';
import {AnimeRepository} from '../repositories';

export class ExamplecontrollerController {
  constructor(
    @repository(AnimeRepository)
    public animeRepository : AnimeRepository,
  ) {}

  @post('/anime')
  @response(200, {
    description: 'Anime model instance',
    content: {'application/json': {schema: getModelSchemaRef(Anime)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anime, {
            title: 'NewAnime',
            exclude: ['id'],
          }),
        },
      },
    })
    anime: Omit<Anime, 'id'>,
  ): Promise<Anime> {
    return this.animeRepository.create(anime);
  }

  @get('/anime/count')
  @response(200, {
    description: 'Anime model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Anime) where?: Where<Anime>,
  ): Promise<Count> {
    return this.animeRepository.count(where);
  }

  @get('/anime')
  @response(200, {
    description: 'Array of Anime model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Anime, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Anime) filter?: Filter<Anime>,
  ): Promise<Anime[]> {
    return this.animeRepository.find(filter);
  }

  @patch('/anime')
  @response(200, {
    description: 'Anime PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anime, {partial: true}),
        },
      },
    })
    anime: Anime,
    @param.where(Anime) where?: Where<Anime>,
  ): Promise<Count> {
    return this.animeRepository.updateAll(anime, where);
  }

  @get('/anime/{id}')
  @response(200, {
    description: 'Anime model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Anime, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Anime, {exclude: 'where'}) filter?: FilterExcludingWhere<Anime>
  ): Promise<Anime> {
    return this.animeRepository.findById(id, filter);
  }

  @patch('/anime/{id}')
  @response(204, {
    description: 'Anime PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anime, {partial: true}),
        },
      },
    })
    anime: Anime,
  ): Promise<void> {
    await this.animeRepository.updateById(id, anime);
  }

  @put('/anime/{id}')
  @response(204, {
    description: 'Anime PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() anime: Anime,
  ): Promise<void> {
    await this.animeRepository.replaceById(id, anime);
  }

  @del('/anime/{id}')
  @response(204, {
    description: 'Anime DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.animeRepository.deleteById(id);
  }
}
