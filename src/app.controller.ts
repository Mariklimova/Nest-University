import { Controller, Get, Body, Post, Param, Put, Delete,Patch } from '@nestjs/common';
import { AppService } from './app.service';

interface iUser {
  id?: number,
  name: string,
  description: string
}
interface iBody {
  name: string,
  description: string
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getItemDB(): iUser[] | string {
    try {
      return this.appService.getAllItem();
    } catch (error) {
      return error.message
    }
  }
  @Post()
  postItemDB(@Body() obj: iBody): iUser[] | string {
    try {
      return this.appService.createItem(obj);
    } catch (error) {
      return error.message
    }
  }
  @Put('/:id')
  putItemDB(@Body() obj: iBody, @Param('id') id: string): iUser[] | string {
    try {
      return this.appService.updateItem(obj,id);
    } catch (error) {
      return error.message
    }
  }
  @ Delete('/:id')
  deleteItemDB(@Param('id') id:string): iUser[] | string {
    try {
      
      return this.appService.deleteItem(id);
    } catch (error) {
      return error.message
    }

  }

  @Patch('/:id')
  patchItemDB(@Body() obj: Partial<iBody>, @Param('id') id: string): iUser[] | string {
    try {
      return this.appService.patchItem(obj,id);
    } catch (error) {
      return error.message
    }
  }
}
