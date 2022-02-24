export const database = {
    properties: {
        databaseName: 'units',
        columnDefaults: {
            name: 'Unknown',
            stats: {
                maxHealth: 1,
                maxMana: 0,
                manaRegen: 0,
                attackSpeed: 0
            }
        }
    },

    rows: {
        cleric: {
            name: 'Cleric',
            stats: {
                maxHealth: 100,
                maxMana: 100,
                manaRegen: 10
            }
        }
    }
}