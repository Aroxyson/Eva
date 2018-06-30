export class Items {

    name: string = '';
    flags: Array<string> = [];
    
    sun: string = '';
    heart: string = '';
    flash: string = '';
    flower: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);

        if (this.flags.join().search("sun") != -1) {
          this.sun = require("../images/sun.png");
        }
        if (this.flags.join().search("heart") != -1) {
            this.heart = require("../images/heart.png");
        }
        if (this.flags.join().search("flash") != -1) {
            this.flash = require("../images/flash.png");
        }
        if (this.flags.join().search("flower") != -1) {
            this.flower = require("../images/flower.png");
        }
    }
}
