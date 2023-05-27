import { Module } from "@nestjs/common";
import { TagsController } from "./tags-controller";

@Module({
    imports: [],
    controllers: [TagsController],
    providers: []
})

export class TagsModule {};
