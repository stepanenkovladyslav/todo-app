import { Module } from "@nestjs/common";
import { TagsController } from "./tags-controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tags } from "./tags.model";

@Module({
    imports: [SequelizeModule.forFeature([Tags])],
    controllers: [TagsController],
    providers: []
})

export class TagsModule {};
