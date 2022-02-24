/** MixinBuilder, taken from https://github.com/justinfagnani/mixwith.js
 *  Note: I am not using the npm package because it appears to be out of date
 *
 *  Usage:
 *
 *      class MyClass extends mix(MySuperClass).with(MyMixin, OtherMixin) {
 *          // class methods here, go ahead, use super!
 *      }
 *
 */

export const mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {

    constructor(superclass) {
        this.superclass = superclass || class {};
    }

    /**
     * Applies `mixins` in order to the superclass given to `mix()`.
     *
     * @param {Array.<Mixin>} mixins
     * @return {Function} a subclass of `superclass` with `mixins` applied
     */
    with(...mixins) {
        return mixins.reduce((c, m) => m(c), this.superclass);
    }
}
