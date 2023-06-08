import { Module } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { Tags, TagsSchema } from "./schemas/tags.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Tags.name, schema: TagsSchema}])],
    controllers: [TagsController],
    providers: [TagsService]
})

export class TagsModule {};
