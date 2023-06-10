import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Tasks } from "src/tasks/schemas/tasks.schema";

export type TagsDocument = Tags & Document;

@Schema()


export class Tags {
    @Prop({required: true})
    name: string

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Tasks'}, {default: []}])
    tasks: Array<Tasks>;
}

export const TagsSchema = SchemaFactory.createForClass(Tags);