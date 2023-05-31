import { AllowNull, AutoIncrement, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { TagTasks, Tasks } from "src/tasks/tasks.model";

@Table
export class Tags extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id : number

    @AllowNull(false)
    @Column
    name: string

    @BelongsToMany(()=> Tasks, ()=> TagTasks)
    Tasks: Array<Tasks>
}

