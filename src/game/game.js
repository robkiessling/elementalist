import * as clock from './clock.js'
import {Unit} from "../objects/units/unit.js";
import {Player} from "../objects/units/player.js";

clock.run();

// const displayInterval = clock.setInterval((iterations, period) => {
//     console.log(`Elapsed time: ${clock.displayTime()}`);
// }, 1000);
//
// clock.setTimeout(() => {
//     console.log('stopping the display!');
//     clock.clearInterval(displayInterval);
// }, 5000);

let unit1 = new Unit('warrior');
let unit2 = new Unit('warrior');
let p = new Player('cleric');
