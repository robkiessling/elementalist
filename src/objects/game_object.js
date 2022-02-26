import merge from "lodash/merge.js";
import {mix} from "../utilities/mixin_builder.js";
import {EventMixin} from "../utilities/event_mixin.js";

let objectIdSequence = 0;

function nextObjectId() {
    objectIdSequence++;
    return objectIdSequence;
}

export class GameObject extends mix().with(EventMixin) {
    constructor(dbKey, config) {
        super();

        this._objectId = nextObjectId();
        this._dbKey = dbKey;

        const database = this.constructor.DATABASE;
        if (database) {
            if (!database.properties || !database.rows) {
                console.error(`Database is missing properties/rows.`);
                return;
            }
            if (!database.rows[this.dbKey]) {
                console.warn(`'${database.properties.databaseName}' database has no data for '${this.dbKey}'.`);
            }
            merge(this, database.properties.columnDefaults, database.rows[this.dbKey]);
        }

        merge(this, config);

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
        return `[${this.constructor.name}:${this.dbKey}:${this.objectId}]`;
    }
}
