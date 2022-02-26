import {GameObject} from "../game_object.js";
import {DATABASE} from "./database.js";
import merge from "lodash/merge.js";
import {roundForComparison} from "../../utilities/math.js";

export const TEAMS = {
    player: 0,
    computer: 1
}

export class Unit extends GameObject {
    constructor(dbKey, team, config) {
        super(dbKey, merge(config, { team: team }));
        if (team === undefined) { console.warn(`${this} has no team.`) }

        this._setupEventHandlers();
    }

    static DATABASE = DATABASE;

    // static createAlly(dbKey, config) {
    //     return new this(dbKey, merge(config, { team: 0 }));
    // }
    // static createEnemy(dbKey, config) {
    //     return new this(dbKey, merge(config, { team: 1 }));
    // }

    reset() {
        this.location = { x: 0, y: 0 };
        this.health = this.getStat('maxHealth');
        this.mana = this.getStat('maxMana');
        this.isAlive = true;
        this._attackProgress = this._attackPeriod() - (Math.random() * 500); // About to attack (randomly offset)
    }

    // TODO Move to stats_mixin
    getStat(key) {
        return this.stats[key];
    }

    update(period) {
        // TODO health regen, mana regen, ability cooldowns, etc.
        this._updateAttack(period);
    }

    kill() {
        if (this.isAlive) {
            this.isAlive = false;
            console.log(`${this} has died!`);

            this.trigger('unit:killed', {
                unit: this
            })
        }
    }

    /** ---================================= Attacking =================================--- */

    _attackPeriod() {
        return 1000 / this.getStat('attacksPerSecond');
    }

    _updateAttack(period) {
        if (this.getStat('attacksPerSecond') === 0) {
            return;
        }

        this._attackProgress += period;
        if (roundForComparison(this._attackProgress) >= this._attackPeriod()) {
            if (this._canAttack()) {
                this.trigger('unit:attackReady', { unit: this });
            }
            else {
                // If can't attack due to stun or something, delay progress by a random bit
                // That way if multiple units get stunned at the same time, they don't all sync their attack timers
                this._attackProgress -= Math.random() * 300;
            }
        }
    }

    _canAttack() {
        if (!this.isAlive) { return false; }

        // TODO Check if cc'd

        return true;
    }
    attack(target) {
        // Reset _attackProgress. We keep any overflowed progress (up to a max limit)
        this._attackProgress = Math.max(100, this._attackProgress - this._attackPeriod());

        this.trigger('unit:attacking', {
            unit: this,
            target: target,
            amount: this.getStat('attackDamage')
        });
    }

    /** ---================================= Event Handlers =================================--- */

    _setupEventHandlers() {
        // Note: Other handlers may have reduced the amount of damage before it gets here
        this.off('unit:receivingDamage.Unit').on('unit:receivingDamage.Unit', event => {
            this.health -= event.amount;

            console.log(`${event.source} attacked ${this} for ${event.amount}. New health: ${this.health}`);

            if (roundForComparison(this.health) <= 0) {
                this.kill();
            }
        })
    }


}