import * as clock from './clock.js'

console.log('starting the clock!');
clock.run();

const displayInterval = clock.setInterval((iterations, period) => {
    console.log(`Elapsed time: ${clock.displayTime()}`);
}, 1000);

clock.setTimeout(() => {
    console.log('stopping the display!');
    clock.clearInterval(displayInterval);
}, 5000)