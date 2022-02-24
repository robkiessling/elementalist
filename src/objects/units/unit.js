import {GameObject} from "../game_object.js";
import {database} from "./database.js";

export class Unit extends GameObject {
    constructor(dbKey) {
        super(dbKey, database);

        console.log(this);
    }

}