import TicketControl from "../models/ticket-control.js";

const ticketControl = new TicketControl();


const socketController = (socket) => {

  // Mandamos un mensaje al cliente que se esta conectando
  socket.emit('last-ticket', ticketControl.last);
  socket.emit('current-state', ticketControl.last4);
  
  socket.on("next-ticket", (payload, callback) => {
    const nextTicket = ticketControl.next();
    callback(nextTicket);
    
    //TODO: Notificar que hay un nuevo ticket pendiente de asignar
  });
  
  socket.on("attend-ticket", ({desktop}, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: "El escritorio es obligatorio"
      });
    }
    
    const ticket = ticketControl.attendTicket(desktop);
    
    // TODO: Notificar cambios en los ultimos 4 tickets
    socket.broadcast.emit('current-state', ticketControl.last4);


    if (!ticket) { 
      return callback({
        ok: false,
        msg: "No hay tickets pendientes"
      });
    } else {
      return callback({
        ok: true,
        ticket
      });
    }
  });
};

export { socketController };