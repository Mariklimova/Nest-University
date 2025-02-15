import { Injectable } from '@nestjs/common';
import orders from 'src/storage/orders';

// const data = [
//   {
//     id: 1,
//     name: "Object One",
//     description: "This is the description for object one."
//   },
//   {
//     id: 2,
//     name: "Object Two",
//     description: "This is the description for object two."
//   },
//   {
//     id: 3,
//     name: "Object Three",
//     description: "This is the description for object three."
//   },
//   {
//     id: 4,
//     name: "Object Four",
//     description: "This is the description for object four."
//   }
// ];

interface iUser {
  id?: number,
  userId: number,
  itemName: string,
}

interface iBody {
  userId: number,
  itemName: string,
}

Injectable()
export class OrdersService {
  getAllItem(): iUser[] {
    if (!orders.length) throw new Error('The database is empty')
    return orders;
  }

  createItem(obj: iBody): iUser[] {
    if (!obj.userId || !obj.itemName) throw new Error('There are incomplete fields')
    const newId: number = orders.length === 0 ? 1 : orders[orders.length - 1].id + 1

    orders.push({ id: newId, ...obj })
    return orders;
  }
}

