import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { createTagDTO } from "./dto/createTagDTO.dto";
import { changeTagNameDTO } from "./dto/changeTagNameDTO.dto";
import { addTagToTaskDTO } from "src/tasks/dto/addTagToTaskDTO.dto";

@Controller("tags")

export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get()
    async getAll() {
        return this.tagsService.getAll()
    }

    @Post("create")
    async create(@Body() body: createTagDTO) {
        return this.tagsService.create(body)
    }

    @Get("get-tasks/:id")
    async getTasksBy(@Param("id") id: number) {
        return this.tagsService.getTasksBy(id)
    }

    @Delete(":id")
    async deleteTag(@Param("id") id: number) {
        return this.tagsService.delete(id)
    }

    @Put()
    async changeName(@Body() body: changeTagNameDTO) {
        return this.tagsService.changeName(body)
    }

}