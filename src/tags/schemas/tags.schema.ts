import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { Tasks } from "src/tasks/schemas/tasks.schema";
import { Users } from "src/users/schemas/users.schema";

export type TagsDocument = Tags & Document;

@Schema()


export class Tags {
    @Prop({required: true})
    name: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true})
    user_id: string

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Tasks'}, {default: []}])
    tasks: Array<Tasks>;
}

export const TagsSchema = SchemaFactory.createForClass(Tags);