import { Injectable, NotFoundException } from "@nestjs/common";
import { createTagDTO } from "./dto/createTagDTO.dto";
import { changeTagNameDTO } from "./dto/changeTagNameDTO.dto";
import { Tags } from "./schemas/tags.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TagsSchema } from "./schemas/tags.schema";
import { Users } from "src/users/schemas/users.schema";

@Injectable()

export class TagsService {
    constructor(@InjectModel(Tags.name) private readonly tagsModel : Model<Tags>) {}

    async create(body: createTagDTO) {
       const {name} = body;
       if (name) {
        const newTag = await this.tagsModel.create({name}) 
        await newTag.save()
        return newTag;
       } 
    }

    async getAll() {
        const tags = await this.tagsModel.find()
        if (tags) {
            return tags;
        } 
        return {message: "There are no tags"}
    }

    async getTasksBy(id: number) {
        const tag = await this.tagsModel.findOne({_id:id})
        if (tag) {
            return tag.tasks;
        }
        return {message: "There is no such tag"}
    }

    async delete(_id: number) {
        const tag = await this.tagsModel.findOne({_id});
        if (tag) {
            tag.deleteOne()
            return {message: "Tag was deleted successfully"}
        }
    }

    async changeName(body: changeTagNameDTO):Promise<Tags>{
        const {id, newName} = body;
        const tag = await this.tagsModel.findOne({_id :id});
        if (tag) {
            tag.name = newName;
            tag.save()
            return tag
        } 
        throw new NotFoundException();
    }
}