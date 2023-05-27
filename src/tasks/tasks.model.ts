import { AutoIncrement, Column, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Tasks {
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
