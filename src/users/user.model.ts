import { Column, Table, Model, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table
    export class User extends Model {
        @Column
        @PrimaryKey
        @AutoIncrement
        id: number

        @Column
        username: string

        @Column
        email: string

        @Column
        password: string
}