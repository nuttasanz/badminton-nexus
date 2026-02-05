import { Injectable } from '@nestjs/common';
import { GetCatDto, CreateCatDto, UpdateCatDto } from './dto';

@Injectable()
export class CatsService {
  create(createCatDto: CreateCatDto) {
    return { message: 'This action adds a new cat', body: createCatDto };
  }

  findAll(getCatDto: GetCatDto) {
    return { message: 'This action returns all cats', query: getCatDto };
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return { message: `This action updates a #${id} cat`, body: updateCatDto };
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
