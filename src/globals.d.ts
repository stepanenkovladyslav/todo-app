import {Request} from 'express'
import {Tasks} from "./tasks/schemas/tasks.schema.ts"
import {Tags} from "./tags/schemas/tags.schema.ts"
declare interface RequestWithUser extends Request {
  user: {username: string; email: string; password: string; tags: Array<Tags>; tasks: Array<Tasks>}
}
