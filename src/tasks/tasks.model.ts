import { AllowNull, AutoIncrement,  BelongsToMany, Column, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Tags } from "src/tags/tags.model";

@Table
export class Tasks extends Model {
    @PrimaryKey
    @Unique
    @AutoIncrement
    @Column
    id: number

    @AllowNull(false)
    @Column
    title: string

    @Column
    description: string

    @Column
    file: string 

    @Column
    date: Date
    
    @Column
    isCompleted: boolean

    @BelongsToMany(()=> Tags, ()=> TagTasks)
    Tags: Array<Tags>

}

@Table

export class TagTasks extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number    

    @ForeignKey(()=> Tags)
    @Column
    tagId: number

    @ForeignKey(()=> Tasks)
    @Column
    taskId : number
}