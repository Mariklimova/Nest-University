import { Injectable } from '@nestjs/common';
import users from 'src/storage/users';



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

Injectable()
export class AuthService {

  createItem(obj: iBody): iUser[] {
    if (!obj.username || !obj.email || !obj.password) throw new Error('There are incomplete fields')
    const newId: number = users.length === 0 ? 1 : users[users.length - 1].id + 1

    users.push({ id: newId, ...obj })
    return users;
  }
  
  checkItem(obj: iBody): string {
    this.isValidUser(obj)
    if (!obj.username || !obj.password) throw new Error('There are incomplete fields')
    const checkUsers = users.some((el) => el.username == obj.username && el.password == obj.password);
    return checkUsers ? "Вход выполнен" : "Неверные данные";
  }

  isValidUser(obj: Partial<iBody>) {
    if (obj.username && !isNaN(+obj.username)) throw new Error('Incorrected values')
    if (obj.email && !isNaN(+obj.email)) throw new Error('Incorrected values')
  }
}

