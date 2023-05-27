import { AutoIncrement, Column, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
export class Tags {
    @Column
    @PrimaryKey
    @AutoIncrement
    id : number

    @Column
    @Unique
    name: string
}

