import path from "path";
import fs from "fs";

import * as url from "url";
import * as data from "../db/data.json" assert { type: "json" };

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// import { now, last, tickets, last4 } from "../db/data.json" assert { type: "json" };

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.now = new Date().getDate(); // Solamente el dia
    this.tickets = [];
    this.last4 = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      now: this.now,
      tickets: this.tickets,
      last4: this.last4,
    };
  }

  // init() {
  //   if (data.now === this.now) {
  //     this.last = data.last;
  //     this.tickets = data.tickets;
  //     this.last4 = data.last4;
  //   } else {
  //     // Es otro dia
  //     this.saveOnDB();
  //   }
  // }

  init() {
    const { now, tickets, last, last4 } = data;

    if (now === this.now) {
      this.tickets = tickets;
      this.last = last;
      this.last4 = last4;
    } else {
      // Es otro día
      this.saveOnDB();
    }
  }

  saveOnDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveOnDB();

    return "Ticket " + ticket.number;
  }

  attendTicket(desktop) {
    // No tenemos tickets
    if (this.tickets.length === 0) return null;

    const ticket = this.tickets.shift(); // this.tickets[0]
    ticket.desktop = desktop;

    this.last4.unshift(ticket); // añadir un elemento nuevo al inicio

    if (this.last4.length > 4) {
      this.last4.splice(-1, 1); // Empieza en la ultima pos del arreglo y corta uno (el ultimo)
    }

    this.saveOnDB();

    return ticket;
  }
}

export default TicketControl;
