import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { Tags } from "src/tags/schemas/tags.schema";

@Schema()

export class Tasks {
    @Prop({required: true})
    title: string

    @Prop()
    description: string

    @Prop({default: Date.now()})
    deadline: Date

    @Prop()
    file: string

    @Prop({required: true})
    isCompleted: boolean

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: "Tags"}, {default: []} ])
    tags: Array<Tags>
}

export const TasksSchema = SchemaFactory.createForClass(Tasks)