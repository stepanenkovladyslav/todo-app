import { ConfigurableModuleBuilder } from "@nestjs/common";
import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Tasks extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    id: number

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
}

@Table

export class TagTasks extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    id: number

}