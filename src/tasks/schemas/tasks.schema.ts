import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { Tags } from "src/tags/schemas/tags.schema";

@Schema()

export class Tasks {
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    deadline: Date

    @Prop()
    file: string

    @Prop()
    isCompleted: boolean

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Tags"})
    tags: Array<Tags>
}