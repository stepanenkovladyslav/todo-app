import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { Tasks } from "src/tasks/schemas/tasks.schema";

export type UsersDocument = Users & Document ;

@Schema()

export class Users {
    @Prop({required: true}) 
    username: string

    @Prop({required: true})
    email: string

    @Prop({required: true}) 
    password: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Tasks"})
    tasks: Array<Tasks>
}

export const UsersSchema = SchemaFactory.createForClass(Users);