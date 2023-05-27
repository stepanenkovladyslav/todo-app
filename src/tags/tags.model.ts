import { AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
export class Tags extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    id : number

    @Column
    @Unique
    name: string
}

