const storageKey = "soutien-informatique-tickets-v1";
const form = document.querySelector("#ticket-form");
const filter = document.querySelector("#filter");
const list = document.querySelector("#tickets");
const count = document.querySelector("#count");
const storageError = document.querySelector("#storage-error");

function loadTickets() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? [];
  } catch {
    storageError.textContent = "Impossible de lire les demandes enregistrées.";
    return [];
  }
}

let tickets = loadTickets();

function saveTickets(nextTickets) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(nextTickets));
    storageError.textContent = "";
  } catch {
    storageError.textContent =
      "Impossible d’enregistrer les changements. Ils seront perdus à la fermeture de la page.";
  }
  tickets = nextTickets;
  renderTickets();
}

function matchesFilter(ticket) {
  switch (filter.value) {
    case "urgent-open":
      return ticket.priority === "urgent" && !ticket.resolved;
    case "resolved":
      return ticket.resolved;
    default:
      return true;
  }
}

function createTicketItem(ticket) {
  const item = document.createElement("li");
  const title = document.createElement("h3");
  title.textContent = ticket.subject;
  item.append(title);

  if (ticket.description) {
    const description = document.createElement("p");
    description.textContent = ticket.description;
    item.append(description);
  }

  const details = document.createElement("p");
  const urgent = ticket.priority === "urgent";
  const priority = urgent ? "Priorité urgente" : "Priorité normale";
  const status = ticket.resolved ? "Résolue" : "Ouverte";
  details.textContent = priority + " · " + status;
  details.classList.toggle("urgent", urgent && !ticket.resolved);

  const action = document.createElement("button");
  action.type = "button";
  action.textContent = ticket.resolved ? "Rouvrir" : "Marquer comme résolue";
  action.setAttribute("aria-label", action.textContent + " — " + ticket.subject);
  action.addEventListener("click", () => {
    saveTickets(tickets.map((current) =>
      current.id === ticket.id ? { ...current, resolved: !current.resolved } : current
    ));
    const updatedAction = [...list.querySelectorAll("button")].find(
      (button) => button.closest("li").dataset.ticketId === ticket.id
    );
    (updatedAction ?? filter).focus();
  });

  item.dataset.ticketId = ticket.id;
  item.append(details, action);
  return item;
}

function renderTickets() {
  const visibleTickets = tickets.filter(matchesFilter);
  list.replaceChildren(...visibleTickets.map(createTicketItem));
  const total = visibleTickets.length;
  count.textContent = total ? total + (total === 1 ? " demande" : " demandes") : "Aucune demande à afficher.";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(form);
  const subject = fields.get("subject").trim();
  if (!subject) {
    form.elements.subject.setCustomValidity("Saisissez un sujet.");
    form.elements.subject.reportValidity();
    return;
  }
  const ticket = {
    id: crypto.randomUUID(),
    subject,
    description: fields.get("description").trim(),
    priority: fields.get("priority"),
    resolved: false,
  };

  filter.value = "all";
  saveTickets([ticket, ...tickets]);
  form.reset();
  form.elements.subject.focus();
});

form.elements.subject.addEventListener("input", () => {
  form.elements.subject.setCustomValidity("");
});
filter.addEventListener("change", renderTickets);
renderTickets();
