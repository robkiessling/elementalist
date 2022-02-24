import merge from "lodash/merge.js";

let objectIdSequence = 0;

function nextObjectId() {
    objectIdSequence++;
    return objectIdSequence;
}

export class GameObject {
    constructor(dbKey, database) {
        this._objectId = nextObjectId();
        this._dbKey = dbKey;

        if (database) {
            if (!database.properties || !database.rows) {
                console.error(`Database for dbKey '${this.dbKey}' is missing properties/rows.`);
                return;
            }
            if (!database.properties.columnDefaults) {
                console.warn(`'${database.properties.databaseName}' database has no columnDefaults set.`);
            }
            if (!database.rows[this.dbKey]) {
                console.warn(`'${database.properties.databaseName}' database has no data for '${this.dbKey}'.`);
            }
            merge(this, database.properties.columnDefaults, database.rows[this.dbKey]);
        }

        // TODO Init stats
    }

    /**
     * Every instance of GameObject has a unique objectId value.
     * TODO Not sure if we need this, it is mostly used for console logging
     */
    get objectId() {
        return this._objectId;
    }

    get dbKey() {
        return this._dbKey;
    }

    toString() {
        return `[object ${this.constructor.name}] { objectId:${this.objectId} }`;
    }
}
