import { Module } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tags } from "./tags.model";
import { TagsService } from "./tags.service";

@Module({
    imports: [SequelizeModule.forFeature([Tags])],
    controllers: [TagsController],
    providers: [TagsService]
})

export class TagsModule {};
