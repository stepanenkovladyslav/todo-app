import { Body, Controller, Get,  Param, Patch, Put,  UsePipes, ValidationPipe } from '@nestjs/common';
import { TagTasksService } from './tagTasks.service';
import { addTagToTaskDTO } from './dto/addTagToTaskDTO.dto';

@Controller('tag-tasks')
export class TagTasksController {
  constructor(private readonly tagTaskService: TagTasksService) { }

  @Get(":id/tags")
  @UsePipes(new ValidationPipe())
  async getTagsByTask(@Param('id') id: string) {
    return this.tagTaskService.getTagsByTask(id)
  }

  @Patch(":id/tag")
  @UsePipes(new ValidationPipe())
  async addTagToTask(@Param('id') id: string, @Body() body: addTagToTaskDTO) {
    return this.tagTaskService.addTagToTask(id, body);
  }

  @Get(":id/tasks")
  async getTasksByTag(@Param("id") id: string) {
    return this.tagTaskService.getTasksByTag(id)
  }

}
