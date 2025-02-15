import { Controller, Get, Body, Post, Param, Put, Delete,Patch } from '@nestjs/common';
import { AuthService } from './auth.service';

interface iUser {
  id?: number,
  username: string,
  email: string,
  password: string
}

interface iBody {
  username: string,
  email: string,
  password: string
}


@Controller('/auth')
export class AuthController {
  constructor(private readonly appService: AuthService) { }

  @Post('/reg')
  postItemDB(@Body() obj: iBody): iUser[] | string {
    try {
      return this.appService.createItem(obj);
    } catch (error) {
      return error.message
    }
  }
  @Post('/login')
  checkItemDB(@Body() obj: iBody): iUser[] | string {
    try {
      return this.appService.checkItem(obj);
    } catch (error) {
      return error.message
    }
  }
  
}
