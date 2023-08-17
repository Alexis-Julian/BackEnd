import ticketModel from "../models/ticket.model.js";
export default class TicketFactory {
  async getTickets() {
    return await ticketModel.find({});
  }

  async getTicketById(ticketId) {
    return await ticketModel.findById(ticketId);
  }

  async updateTicket(ticketId, queries) {
    return await ticketModel.findByIdAndUpdate(ticketId, queries && queries);
  }

  async newTicket(ticket) {
    try {
      let Newticket = new ticketModel(ticket);
      await Newticket.save();
      return Newticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
