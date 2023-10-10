import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { createTagDTO } from "./dto/createTagDTO.dto";
import { changeTagNameDTO } from "./dto/changeTagNameDTO.dto";
import { Tags } from "./schemas/tags.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TagsSchema } from "./schemas/tags.schema";
import { Users } from "src/users/schemas/users.schema";
import { RequestWithUser } from "src/globals";

@Injectable()

export class TagsService {
  constructor(@InjectModel(Tags.name) private readonly tagsModel: Model<Tags>) { }

  async create(body: createTagDTO, req: RequestWithUser): Promise<Tags> {
    const { name } = body;
    const newTag = await this.tagsModel.create({ name, user_id: req.user._id })
    req.user.tags.push(newTag)
    await req.user.save()
    await newTag.save()
    return newTag;
  }

  async getAll(req: RequestWithUser): Promise<Array<Tags>> {
    return Promise.all(req.user.tags.map(async (tagId: Tags) => {
      const tag = await this.tagsModel.findOne({ _id: tagId });
      return tag
    }))
  }

  async changeName(id: string, body: changeTagNameDTO): Promise<Tags> {
    const { newName } = body;
    const tag = await this.tagsModel.findByIdAndUpdate(id, {name: newName}, (err: Error) => {
      if(err) {
        throw new NotFoundException(`The task with id ${id} is not found`)
      }
    })
    ;
    return tag
  }
}
