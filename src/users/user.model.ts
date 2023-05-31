import { Column, Table, Model, PrimaryKey, AutoIncrement, Unique } from "sequelize-typescript";

@Table
    export class User extends Model {
        @PrimaryKey
        @Unique
        @AutoIncrement
        @Column
        id: number

        @Column
        username: string

        @Column
        email: string

        @Column
        password: string
}