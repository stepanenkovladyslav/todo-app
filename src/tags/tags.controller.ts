import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { createTagDTO } from "./dto/createTagDTO.dto";
import { changeTagNameDTO } from "./dto/changeTagNameDTO.dto";
import { RequestWithUser } from "src/globals";

@Controller("tags")

export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Get()
  async getAll(@Req() req: RequestWithUser) {
    return this.tagsService.getAll(req)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() body: createTagDTO, @Req() req: RequestWithUser) {
    return this.tagsService.create(body, req)
  }

  @Patch(':id/name')
  @UsePipes(new ValidationPipe())
  async changeName(@Param('id') id: string, @Body() body: changeTagNameDTO) {
    return this.tagsService.changeName(id, body)
  }

}
