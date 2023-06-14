import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { getOneTaskDTO } from './dto/getOne.dto';
import { TagTasksService } from './tagTasks.service';
import { addTagToTaskDTO } from './dto/addTagToTaskDTO.dto';

@Controller('tag-tasks')
export class TagTasksController {
    constructor(private readonly tagTaskService: TagTasksService) {}
    
    @Get("/get-tags/:id")
    async getTagsByTask(@Param("id") id: getOneTaskDTO) {
    return this.tagTaskService.getTagsByTask(id)
   }

    @Put("add-tag")
    async addTagToTask(@Body() body: addTagToTaskDTO) {
    return this.tagTaskService.addTagToTask(body);
   }

   @Get("get-tasks/:id")
    async getTasksByTag(@Param("id") id: number) {
        return this.tagTaskService.getTasksByTag(id)
    }

}
