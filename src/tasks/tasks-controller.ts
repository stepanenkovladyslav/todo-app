import { Controller, Get } from "@nestjs/common";

@Controller("tasks")

export class TasksController {
   @Get()
   printTasks() {
    console.log("Print Tasks")
   } 
}