import {Request} from 'express'
import {Tasks} from "./tasks/schemas/tasks.schema.ts"
import {Tags} from "./tags/schemas/tags.schema.ts"
import { ObjectId } from 'mongoose';
import { Users } from './users/schemas/users.schema.js';
import { Document } from 'mongoose';
declare interface RequestWithUser extends Request {
  user:Users & Document 
}
// {id?: ObjectId; username: string; email: string; password: string; tags: Array<Tags>; tasks: Array<Tasks>}
