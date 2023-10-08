import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { Tags } from "src/tags/schemas/tags.schema";
import { Users } from "src/users/schemas/users.schema";

@Schema()

export class Tasks {
  @Prop({ required: true })
  title: string

  @Prop()
  description: string

  @Prop({ default: Date.now() })
  deadline: Date

  @Prop({ default: '' })
  file: string

  @Prop({ required: true })
  isCompleted: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  user_id: Users

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }, { default: [] }])
  tags: Array<Tags>
}

export const TasksSchema = SchemaFactory.createForClass(Tasks)
