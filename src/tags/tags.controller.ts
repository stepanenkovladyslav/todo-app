import { Body, Controller, Delete, Get, Param, Post, Put, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { createTagDTO } from "./dto/createTagDTO.dto";
import { changeTagNameDTO } from "./dto/changeTagNameDTO.dto";
import { addTagToTaskDTO } from "src/tagTasks/dto/addTagToTaskDTO.dto";
import { RequestWithUser } from "src/globals";

@Controller("tags")

export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get()
    async getAll(@Req() req: RequestWithUser) {
        return this.tagsService.getAll(req)
    }

    @Post("create")
    @UsePipes(new ValidationPipe())
    async create(@Body() body: createTagDTO, @Req() req: RequestWithUser) {
        return this.tagsService.create(body, req)
    }

    
    // @Delete(":id")
    // async deleteTag(@Param("id") id: number) {
    //     return this.tagsService.delete(id)
    // }

 
    @Put()
    @UsePipes(new ValidationPipe())
    async changeName(@Body() body: changeTagNameDTO) {
        return this.tagsService.changeName(body)
    }

}
