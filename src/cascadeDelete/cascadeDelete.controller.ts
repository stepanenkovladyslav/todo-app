import { Controller, Delete, HttpCode, Param, Req, Res } from "@nestjs/common";
import { cascadeDeleteService } from "./cascadeDelete.service";

@Controller('delete')

export class cascadeDeleteController {
    constructor(private readonly deleteService: cascadeDeleteService) {}

    @Delete('users/:id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: string) {
        return this.deleteService.deleteUser(id)
    }

    @Delete('/tasks/:id')
    @HttpCode(204)
    async deleteTask(@Req() req: Request, @Param('id') id:string) {
        return this.deleteService.deleteTask(req, id)
    }

    @Delete('tags/:id')
    @HttpCode(204)
    async deleteTag(@Req() req: Request, @Param('id') id:string) {
        return this.deleteService.deleteTag(req, id)
    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1heCIsImVtYWlsIjoibWF4QGdtYWlsLmNvbSIsImlhdCI6MTY4NjczNjc2MSwiZXhwIjoxNjg2NzQzOTYxfQ.V6kzcKFt1avtXcCLCTvEMp06TxPpj--ehfMT2ucnOy0
