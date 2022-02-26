export const DATABASE = {
    properties: {
        databaseName: 'units',
        columnDefaults: {
            name: 'Unknown',
            stats: {
                maxHealth: 1,
                maxMana: 0,
                manaRegen: 0,
                attacksPerSecond: 0.5,
                attackDamage: 10
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
        },
        warrior: {
            name: 'Warrior',
            stats: {
                maxHealth: 200,
                attackDamage: 30
            }
        }
    }
}