import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { Tags } from "src/tags/schemas/tags.schema";
import { Tasks } from "src/tasks/schemas/tasks.schema";

export type UsersDocument = Users & Document ;

@Schema()

export class Users {
    @Prop({required: true, unique: true}) 
    username: string

    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true}) 
    password: string

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: "Tasks"}, {default: []}]) 
    tasks: Array<Tasks>

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: "Tags"}, {default: []}])
    tags: Array<Tags>
}

export const UsersSchema = SchemaFactory.createForClass(Users);