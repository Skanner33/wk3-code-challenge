function moviesDo() {
  const movies = document.getElementById("films");

  const filmSetup = document.getElementById("filmSetup");

  fetch("https://skanner33.github.io/Skanner33-github.io/db.json")
    .then((response) => response.json())
    .then((data) => createFilmDetails(data.films, filmSetup));

  fetch("https://skanner33.github.io/Skanner33-github.io/db.json")
    .then((resp) => resp.json())
    .then((data) => {
      data.films.forEach((films) => {
        const movieList = document.createElement("li");

        const pTitle = document.createElement("p");
        pTitle.innerText = films.title;
        movieList.appendChild(pTitle);
        movies.appendChild(movieList);

        movieList.addEventListener("click", () => {
          filmSetup.innerHTML = "";
          createFilmDetails(films, filmSetup);
        });
      });
    });
}
document.addEventListener("DOMContentLoaded", moviesDo);

function createFilmDetails(data, andAdd) {
  const title = document.createElement("h2");
  title.innerText = data.title;
  andAdd.appendChild(title);

  const runtime = document.createElement("p");
  runtime.innerHTML = `<b>Run Time:</b> ${data.runtime}`;
  andAdd.appendChild(runtime);

  const poster = document.createElement("img");
  poster.src = data.poster;
  andAdd.appendChild(poster);

  const showtime = document.createElement("p");
  showtime.innerHTML = `<b>Show Time:</b> ${data.showtime}<p><b>Available Tickets<b></p>`;
  andAdd.appendChild(showtime);

  const description = document.createElement("p");
  description.innerText = data.description;
  andAdd.appendChild(description);

  const capacity = data.capacity;
  const soldTickets = data.tickets_sold;
  let remainingTickets = capacity - soldTickets;

  const ticketsAvailable = document.createElement("p");
  ticketsAvailable.innerText = remainingTickets;
  andAdd.appendChild(ticketsAvailable);

  const buyTicketBtn = document.createElement("button");
  buyTicketBtn.innerText = "Buy Ticket";
  buyTicketBtn.addEventListener("click", () => {
    if (remainingTickets > 1) {
      remainingTickets -= 1;
      ticketsAvailable.innerText = remainingTickets;
    } else {
      ticketsAvailable.innerText = 0;
      buyTicketBtn.disabled = true;
      buyTicketBtn.innerText = "SOLD OUT";
    }
  });
  andAdd.appendChild(buyTicketBtn);
}
