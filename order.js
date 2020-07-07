const moment = require("moment");
const { v4: uuid } = require("uuid");

exports.Order = class Order {
    constructor(name, phone) {
        this.name = name;
        this.timeUTC = moment.utc();
        this.phone = phone;
        this.uuid = uuid();
    }

    toString() {
        return `${this.name} - ${this.phone}: ${this.timeUTC.format("M/D/YYYY, h:mm:ss a")}`;
    }

    toJSON() {
        return {
            name: this.name,
            phone: this.phone,
            timeUTC: this.timeUTC.format(),
            uuid: this.uuid 
        }
    }
}