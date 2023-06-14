import { Controller, Delete, Param, Req } from "@nestjs/common";
import { cascadeDeleteService } from "./cascadeDelete.service";

@Controller('delete')

export class cascadeDeleteController {
    constructor(private readonly deleteService: cascadeDeleteService) {}

    @Delete('/users/:id')
    async deleteUser(@Param('id') id: string) {
        this.deleteService.deleteUser(id)
    }

    @Delete('tasks/:id')
    async deleteTask(@Req() req: Request, @Param('id') id:string) {
        this.deleteService.deleteTask(req, id)
    }

    @Delete('tags/:id')
    async deleteTag(@Req() req: Request, @Param('id') id:string) {
        this.deleteService.deleteTag(req, id)
    }
}