import { Injectable } from '@nestjs/common';

const data = [
  {
    id: 1,
    name: "Object One",
    description: "This is the description for object one."
  },
  {
    id: 2,
    name: "Object Two",
    description: "This is the description for object two."
  },
  {
    id: 3,
    name: "Object Three",
    description: "This is the description for object three."
  },
  {
    id: 4,
    name: "Object Four",
    description: "This is the description for object four."
  }
];

interface iUser {
  id?: number,
  name: string,
  description: string
}

interface iBody {
  name: string,
  description: string
}

Injectable()
export class AppService {
  getAllItem(): iUser[] {
    if (!data.length) throw new Error('The database is empty')
    return data;
  }

  createItem(obj: iBody): iUser[] {
    this.isValidUser(obj)
    if (!obj.name || !obj.description) throw new Error('There are incomplete fields')
    const newId: number = data.length === 0 ? 1 : data[data.length - 1].id + 1

    data.push({ id: newId,...obj })
    return data;
  }
  updateItem(obj: iBody, id: string): iUser[] {
    this.isValidUser(obj)
    if (!obj.name || !obj.description) throw new Error('There are incomplete fields')
    const indexElem = data.findIndex((el) => el.id === +id)
    if (indexElem === -1) {
      throw new Error('Such ID does not exist')
    } else {
      data[indexElem] = { ...data[indexElem], ...obj }
      return data;
    }
  }
  deleteItem(id: string): iUser[] {
    const indexElem = data.findIndex((el) => el.id === +id)
    if (indexElem === -1) {
      throw new Error('Such ID does not exist')
    } else {
      data.splice(indexElem, 1)
      return data;
    }
  }

  patchItem(obj: Partial<iBody>, id: string): iUser[] {
    this.isValidUser(obj)
    const indexElem = data.findIndex((el) => el.id === +id)
    if (indexElem === -1) {
      throw new Error('Such ID does not exist')
    } else {
      data[indexElem] = { ...data[indexElem], ...obj }
      return data;
    }
  }

  isValidUser(obj: Partial<iBody>) {
    if (obj.name && !isNaN(+obj.name)) throw new Error('@@@@@@')
    if (obj.description && !isNaN(+obj.description)) throw new Error('@@@@@@')
  }
}

