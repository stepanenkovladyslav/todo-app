import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tags } from "src/tags/schemas/tags.schema";
import { Tasks } from "src/tasks/schemas/tasks.schema";
import { addTagToTaskDTO } from "./dto/addTagToTaskDTO.dto";
import { Users } from "src/users/schemas/users.schema";

@Injectable()

export class TagTasksService {
  constructor(@InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>, @InjectModel(Tags.name) private readonly tagsModel: Model<Tags>, @InjectModel(Users.name) private readonly userModel: Model<Users>) { }

  async getTagsByTask(id: string): Promise<Array<Tags>> {
    const task = await this.taskModel.findOne({ _id: id })
    const tags = task.tags;
    const allTags = Promise.all(tags.map((async tagId => {
      const tag = await this.tagsModel.findOne({ _id: tagId });
      return tag
    })))
    return allTags
  }

  async addTagToTask(id: string, body: addTagToTaskDTO): Promise<Tasks> {
    const { tagId } = body;
    const task = await this.taskModel.findOne({ _id: id })
    const tag = await this.tagsModel.findOne({ _id: tagId })
    if (task && tag) {
      task.tags.push(tag.id);
      tag.tasks.push(task.id);
      await task.save();
      await tag.save();
      return task
    } else {
      throw new NotFoundException('Not Found')
    }
  }

  async getTasksByTag(id: string): Promise<Array<Tasks>> {
    const tag = await this.tagsModel.findOne({ _id: id })
    return Promise.all(tag.tasks.map(async (taskId) => {
      return await this.taskModel.findOne({ _id: taskId })
    }));
  }
}
