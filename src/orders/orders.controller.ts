import { Controller, Get, Body, Post, Param, Put, Delete,Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';

interface iUser {
  id?: number,
  userId: number,
  itemName: string,
}

interface iBody {
  userId: number,
  itemName: string,
}


@Controller('/orders')
export class OrdersController {
  constructor(private readonly appService: OrdersService) { }

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
  
}
