import { Controller, Delete, Param } from "@nestjs/common";
import { cascadeDeleteService } from "./cascadeDelete.service";

@Controller('delete')

export class cascadeDeleteController {
    constructor(private readonly deleteService: cascadeDeleteService) {}

    @Delete('/users/:id')
    async deleteUser(@Param('id') id: number) {
        this.deleteService.deleteUser(id)
    }
}