export default class TicketDTO {
  constructor(ticket) {
    this.name = "SandBox";
    this.products = ticket.product;
    this.code = this.generateRandomCode(8);
    this.amount = ticket.amount;
    this.purchaser = "test@gmail.com";
  }

  generateRandomCode(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  // Generar un código aleatorio de longitud 8
}
