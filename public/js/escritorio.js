//Referencias HTML
const lblDesktop = document.querySelector("h1"); // El primer h1 que encuentre
const btnAttendTicket = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert"); // Primera clase con el alert

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const desktop = searchParams.get("escritorio");
lblDesktop.innerText = desktop;

divAlert.style.display = "none";

const socket = io();

socket.on("connect", () => {
  btnAttendTicket.disabled = false;
});

socket.on("disconnect", () => {
  btnAttendTicket.disabled = true;
});

socket.on("last-ticket", (lastTicket) => {
  // lblNewTicket.innerText = "Ticket " + lastTicket;
});

btnAttendTicket.addEventListener("click", () => {
  socket.emit("attend-ticket", { desktop }, ({ ok, ticket }) => {
    if (!ok) {
      lblTicket.innerText = "Nadie";
      return (divAlert.style.display = "");
    }

    lblTicket.innerText = `Ticket ${ticket.number}`;
  });

  // socket.emit( 'next-ticket', null, ( ticket ) => {
  //   lblNewTicket.innerText = ticket;
  // });
});
