import { Ticket as TicketFactory } from "../dao/factory.js";
import TicketDTO from "./DTOs/ticket.dto.js";
let TicketFactoryI = new TicketFactory();

export default class TicketManager {
  createTicket(data) {
    console.log(data);
    /* let ticket = TicketFactoryI.newTicket(data); */
    return 1;
  }
}
