import { Body, Controller, Get,  Param, Patch, Put,  UsePipes, ValidationPipe } from '@nestjs/common';
import { getOneTaskDTO } from './dto/getOne.dto';
import { TagTasksService } from './tagTasks.service';
import { addTagToTaskDTO } from './dto/addTagToTaskDTO.dto';

@Controller('tag-tasks')
export class TagTasksController {
  constructor(private readonly tagTaskService: TagTasksService) { }

  @Get("/tags/:id")
  @UsePipes(new ValidationPipe())
  async getTagsByTask(@Param() params: getOneTaskDTO) {
    return this.tagTaskService.getTagsByTask(params)
  }

  @Patch(":id/tags")
  @UsePipes(new ValidationPipe())
  async addTagToTask(@Param('id') id: string, @Body() body: addTagToTaskDTO) {
    return this.tagTaskService.addTagToTask(id, body);
  }

  @Get("tasks/:id")
  async getTasksByTag(@Param("id") id: string) {
    return this.tagTaskService.getTasksByTag(id)
  }

}
