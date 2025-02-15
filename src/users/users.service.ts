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
export class UsersService {
  getAllItem(): iUser[] {
    if (!users.length) throw new Error('The database is empty')
    return users;
  }

  createItem(obj: iBody): iUser[] {
    this.isValidUser(obj)
    if (!obj.username || !obj.email || !obj.password) throw new Error('There are incomplete fields')
    const newId: number = users.length === 0 ? 1 : users[users.length - 1].id + 1

    users.push({ id: newId,...obj })
    return users;
  }
  updateItem(obj: iBody, id: string): iUser[] {
    this.isValidUser(obj)
    if (!obj.username || !obj.email || !obj.password) throw new Error('There are incomplete fields')
    const indexElem = users.findIndex((el) => el.id === +id)
    if (indexElem === -1) {
      throw new Error('Such ID does not exist')
    } else {
      users[indexElem] = { ...users[indexElem], ...obj }
      return users;
    }
  }
  deleteItem(id: string): iUser[] {
    const indexElem = users.findIndex((el) => el.id === +id)
    if (indexElem === -1) {
      throw new Error('Such ID does not exist')
    } else {
      users.splice(indexElem, 1)
      return users;
    }
  }

  patchItem(obj: Partial<iBody>, id: string): iUser[] {
    this.isValidUser(obj)
    const indexElem = users.findIndex((el) => el.id === +id)
    if (indexElem === -1) {
      throw new Error('Such ID does not exist')
    } else {
      users[indexElem] = { ...users[indexElem], ...obj }
      return users
    }
  }

  isValidUser(obj: Partial<iBody>) {
    if (obj.username && !isNaN(+obj.username)) throw new Error('Incorrected values')
    if (obj.email && !isNaN(+obj.email)) throw new Error('Incorrected values')
  }
}

