import * as clock from './clock.js'
import {TEAMS, Unit} from "../objects/units/unit.js";
import {Player} from "../objects/units/player.js";
import * as combatEngine from './combat_engine.js';

const UPDATES_PER_SECOND = 15;

clock.run();

// clock.setTimeout(() => {
//     console.log('stopping the display!');
//     clock.clearInterval(displayInterval);
// }, 5000);

const gameInterval = clock.setInterval((iterations, period) => {
    // The following processes have to be iterated through in order
    while (iterations > 0) {
        combatEngine.update(period);
        iterations--;
    }

    // The following processes can be batched
    // TODO combatInterface.draw();
    // console.log(`Elapsed time: ${clock.displayTime()}`);
}, 1000 / UPDATES_PER_SECOND);

const party = [
    new Player('cleric', TEAMS.player),
    // new Unit('warrior', TEAMS.player)
];

function loadEncounter() {
    console.log('Loading encounter!');
    combatEngine.reset();

    party.forEach((unit, index) => {
        combatEngine.loadUnit(unit, { x: -100 * (index + 1), y: 0 });
    });

    const enemies = [
        new Unit('warrior', TEAMS.computer)
    ];
    enemies.forEach((unit, index) => {
        combatEngine.loadUnit(unit, { x: +100 * (index + 1), y: 0 });
    });

    combatEngine.togglePaused(false);
}

loadEncounter();

clock.setTimeout(() => {
    loadEncounter();
}, 10000)