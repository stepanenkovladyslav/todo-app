import { Inject, Injectable, NotFoundException } from "@nestjs/common";
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

    async create(body: createTagDTO, req: Request) {
       const {name} = body;
       if (name) {
        const newTag = await this.tagsModel.create({name, user_id: req['user']._id}) 
        req['user'].tags.push(newTag)
        req['user'].save()
        await newTag.save()
        return newTag;
       } 
    }

    async getAll(req: Request) {
        return req['user'].tags
    }

    async delete(_id: number) {
        const tag = await this.tagsModel.findOne({_id});
        if (tag) {
            await tag.deleteOne()
            
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