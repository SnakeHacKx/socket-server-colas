// Referencias HTML
const lblNewTicket = document.querySelector("#lblNewTicket");
const btnCreateTicket = document.querySelector("button"); // Solo button porque solo hay un boton

const socket = io();

socket.on('connect', () => {
    btnCreateTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnCreateTicket.diasabled = true;
});

socket.on('last-ticket', (lastTicket) => {
  lblNewTicket.innerText = "Ticket " + lastTicket;
});


btnCreateTicket.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
      lblNewTicket.innerText = ticket;
    });

});