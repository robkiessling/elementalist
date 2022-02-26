
let units = [];
let paused = true;

export function reset() {
    units = [];
    togglePaused(true);
}

export function loadUnit(unit, location) {
    unit.reset();
    unit.location = location;

    unit.off('unit:attackReady.CombatEngine').on('unit:attackReady.CombatEngine', event => {
        let target = getClosestEnemyFor(event.unit);
        if (target) {
            event.unit.attack(target);
        }
    }).off('unit:attacking.CombatEngine').on('unit:attacking.CombatEngine', event => {
        event.target.trigger('unit:receivingDamage', {
            unit: event.target,
            source: event.unit,
            amount: event.amount
        });
    })

    units.push(unit);
}

export function togglePaused(shouldPause) {
    paused = shouldPause;
}

export function update(period) {
    if (!paused) {
        units.forEach(unit => unit.update(period));
    }
}

function getClosestUnit(source, filter) {
    let closestDistance = null;
    let closestUnit = null;

    (filter ? units.filter(filter) : units).forEach(unit => {
        let distance = Math.abs(source.location.x - unit.location.x);
        if (closestDistance === null || distance < closestDistance) {
            closestDistance = distance;
            closestUnit = unit;
        }
    });

    return closestUnit;
}

function getClosestEnemyFor(source) {
    return getClosestUnit(source, unit => {
        return unit.team !== source.team && unit.isAlive;
    });
}
