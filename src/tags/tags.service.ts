import { Injectable } from "@nestjs/common";
import { createTagDTO } from "./dto/createTagDTO.dto";
import { Tags } from "./tags.model";
import { Model } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";
import { Tasks } from "src/tasks/tasks.model";
import { changeTagNameDTO } from "./dto/changeTagNameDTO.dto";

@Injectable()

export class TagsService {
    constructor(@InjectModel(Tags) private readonly tagsModel : typeof Tags) {}

    async create(body: createTagDTO) {
       const {name} = body;
       if (name) {
        const newTag = await this.tagsModel.create({name}) 
        await newTag.save()
        return newTag
       } 
    }

    async getAll() {
        const tags = await this.tagsModel.findAll()
        if (tags) {
            return tags;
        } 
        return {message: "There are no tags"}
    }

    async getTasksBy(id: number) {
        const tag = await this.tagsModel.findOne({where: {id}, include: [{model: Tasks, through : {attributes: []}}]})
        if (tag) {
            return tag.Tasks;
        }
        return {message: "There is no such tag"}
    }

    async delete(id: number) {
        const tag = await this.tagsModel.findOne({where: {id}});
        if (tag) {
           tag.destroy()
            return {message: "Tag was deleted successfully"}
        }
    }

    async changeName(body: changeTagNameDTO) {
        const {id, newName} = body;
       const tag = await this.tagsModel.findOne({where: {id}});
       if (tag) {
        tag.name = newName;
        tag.save()
        return tag
       } 
       return {message: "There is no such tag"}
    }
}