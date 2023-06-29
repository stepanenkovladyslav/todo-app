import { Body, Controller, Get, Inject, Param, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { getOneTaskDTO } from './dto/getOne.dto';
import { TagTasksService } from './tagTasks.service';
import { addTagToTaskDTO } from './dto/addTagToTaskDTO.dto';
import { RequestWithUser } from 'src/globals';

@Controller('tag-tasks')
export class TagTasksController {
    constructor(private readonly tagTaskService: TagTasksService) {}
    
    @Get("/get-tags/:id")
    @UsePipes(new ValidationPipe())
    async getTagsByTask(@Param() params: getOneTaskDTO) {
    return this.tagTaskService.getTagsByTask(params)
   }

    @Put("add-tag")
    @UsePipes(new ValidationPipe())
    async addTagToTask(@Body() body: addTagToTaskDTO) {
    return this.tagTaskService.addTagToTask(body);
   }

   @Get("get-tasks/:id")
    async getTasksByTag(@Param("id") id: string){
        return this.tagTaskService.getTasksByTag(id)
    }

}
