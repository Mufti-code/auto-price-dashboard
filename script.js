let offers = JSON.parse(localStorage.getItem("offers")) || [];

let editIndex = null;

// AUTO PRICE 🔥
function autoPrice(offer) {
  if (offer.stock < 5) offer.price += 2000;
  else if (offer.stock > 20) offer.price -= 1000;
}

// SAVE
function saveData() {
  localStorage.setItem("offers", JSON.stringify(offers));
}

// RENDER
function renderTable() {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  offers.forEach((offer, index) => {
    autoPrice(offer);

    table.innerHTML += `
      <tr>
        <td>${offer.name}</td>
        <td>${offer.price}</td>
        <td>${offer.stock}</td>
        <td class="${offer.status === "Active" ? "status-active" : "status-paused"}">
          ${offer.status}
        </td>
        <td>
          <button onclick="openModal(${index})">Edit</button>
          <button onclick="deleteOffer(${index})">Delete</button>
          <button onclick="toggleStatus(${index})">Toggle</button>
        </td>
      </tr>
    `;
  });

  saveData();
}

// MODAL
function openModal(index = null) {
  document.getElementById("modal").style.display = "block";

  if (index !== null) {
    editIndex = index;
    const offer = offers[index];

    document.getElementById("modalTitle").innerText = "Edit Offer";
    document.getElementById("name").value = offer.name;
    document.getElementById("price").value = offer.price;
    document.getElementById("stock").value = offer.stock;
  } else {
    editIndex = null;
    document.getElementById("modalTitle").innerText = "Add Offer";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// SAVE OFFER
function saveOffer() {
  const name = document.getElementById("name").value;
  const price = Number(document.getElementById("price").value);
  const stock = Number(document.getElementById("stock").value);

  if (!name) return alert("Name required");

  if (editIndex !== null) {
    offers[editIndex] = { ...offers[editIndex], name, price, stock };
  } else {
    offers.push({ name, price, stock, status: "Active" });
  }

  closeModal();
  renderTable();
}

// DELETE
function deleteOffer(index) {
  if (confirm("Delete this item?")) {
    offers.splice(index, 1);
    renderTable();
  }
}

// TOGGLE
function toggleStatus(index) {
  offers[index].status =
    offers[index].status === "Active" ? "Paused" : "Active";
  renderTable();
}

renderTable();