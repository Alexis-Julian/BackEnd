export default class TicketDTO {
  constructor(ticket) {
    this.name = "SandBox";
    this.products = formateProduct(ticket);
    this.total = price(ticket);
    this.code = ticket.code;
  }
}
