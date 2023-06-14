import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tags } from "src/tags/schemas/tags.schema";
import { Tasks } from "src/tasks/schemas/tasks.schema";
import { getOneTaskDTO } from "./dto/getOne.dto";
import { addTagToTaskDTO } from "./dto/addTagToTaskDTO.dto";

@Injectable() 

export class TagTasksService {
    constructor(@InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>, @InjectModel(Tags.name) private readonly tagsModel: Model<Tags>) {}

    async getTagsByTask(id:getOneTaskDTO) {
        const task = await this.taskModel.findOne({_id: id}) 
        if (task) {
         const tags = task.tags;
         const allTags = Promise.all(tags.map(( async tagId => {
             const tag = await this.tagsModel.findOne({_id: tagId});
             return tag
         })))
         return allTags
        } 
        throw new NotFoundException()
     }

     async addTagToTask(body: addTagToTaskDTO) {
        const {tagId, id} = body;
        const task = await this.taskModel.findOne({_id: id})
        const tag = await this.tagsModel.findOne({_id: tagId}) // catch if not found, will throw error
        if (task && tag) {
            task.tags.push(tag);
            tag.tasks.push(task)
            await task.save()
            await tag.save()
            return task
        }
    }

    async getTasksByTag(id: number) {
        const tag = await this.tagsModel.findOne({_id:id})
        if (tag) {
            return tag.tasks;
        }
        return {message: "There is no such tag"}
    }
}