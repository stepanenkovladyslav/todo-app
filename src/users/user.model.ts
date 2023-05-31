import { Column, Table, Model, PrimaryKey, AutoIncrement, Unique, AllowNull } from "sequelize-typescript";

@Table
    export class User extends Model {
        @PrimaryKey
        @Unique
        @AutoIncrement
        @Column
        id: number

        @AllowNull(false)
        @Column
        username: string

        @AllowNull(false)
        @Column
        email: string

        @AllowNull(false)
        @Column
        password: string
}