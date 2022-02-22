/**
 * Browsers throttle timers when the browser tab is in the background, making window.setInterval and window.setTimeout
 * unusable. We create our own workaround for these methods by basing the intervals/timers on elapsed time.
 */

import {formatDuration} from "./utilities.js";

/* Time based variables, all in milliseconds */
let now = Date.now() || (new Date).getTime(); // Current tick's time
let then = now; // Last tick's time
let delta = 0; // Time since last tick
let total = 0; // Total time elapsed

let timerId = 0;
let timers = {};

export function run() {
    /* Calculate time since last tick */
    now = Date.now() || (new Date).getTime(); // Get current time
    delta = now - then; // Get time since last tick
    then = now; // Reset last tick time
    total += delta;

    updateTimers();

    /* Run function again as soon as possible without lagging */
    window.requestAnimationFrame(run);
}

function updateTimers() {
    for (const [id, timer] of Object.entries(timers)) {
        if (timer === undefined) {
            // When a timer is cleared, it may still be called (with an undefined value) for the current loop
            return;
        }

        timer.current += delta;

        if (timer.current >= timer.delay) {
            if (timer.repeat) {
                const iterations = Math.floor(timer.current / timer.delay);
                timer.callback(iterations, timer.delay);
                timer.current -= iterations * timer.delay;
            }
            else {
                timer.callback(timer.delay);
                clearTimeout(id);
            }
        }
    }
}

/**
 * @callback setIntervalCallback
 * @param {int} iterations The number of iterations that have elapsed since the last evaluation
 * @param {number} delay Length (in milliseconds) of each iteration
 */

/**
 * Register a function to be called periodically. Similar to window.setInterval, but this will remain consistent even
 * if the browser temporarily suspends scripts (e.g. if the tab is in the background).
 * @param {setIntervalCallback} callback Function to be called periodically
 * @param {number} delay Number of milliseconds between timers
 * @param {boolean} [callImmediately=true] If true, callback is immediately called
 * @return {number} ID of the timer (can be used to clear the timer later)
 */
export function setInterval(callback, delay, callImmediately = true) {
    timerId++;

    timers[timerId] = {
        callback: callback,
        delay: delay,
        current: callImmediately ? delay : 0,
        repeat: true
    };

    return timerId;
}

export function clearInterval(id) {
    delete timers[id];
}

/**
 * Register a function to be called after some time has elapsed. Similar to window.setTimeout, but this will remain
 * consistent even if the browser temporarily suspends scripts (e.g. if the tab is in the background).
 */
export function setTimeout(callback, delay) {
    timerId++;

    timers[timerId] = {
        callback: callback,
        delay: delay,
        current: 0,
        repeat: false
    };

    return timerId;
}

export function clearTimeout(id) {
    delete timers[id];
}


export function displayTime() {
    return formatDuration(total);
}