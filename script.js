let offers = JSON.parse(localStorage.getItem("offers")) || [];
let editIndex = null;

function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

function applyAutoPrice(offer) {
  if (offer.stock < 5) offer.price += 2000;
  else if (offer.stock > 20) offer.price -= 1000;
}

function saveData() {
  localStorage.setItem("offers", JSON.stringify(offers));
}

function updateStats() {
  document.getElementById("totalProduct").innerText = offers.length;

  const totalStock = offers.reduce((a, b) => a + b.stock, 0);
  document.getElementById("totalStock").innerText = totalStock;

  const active = offers.filter(o => o.status === "Active").length;
  document.getElementById("activeCount").innerText = active;
}

function renderTable() {
  const table = document.getElementById("tableBody");
  const search = document.getElementById("search").value.toLowerCase();

  table.innerHTML = "";

  offers
    .filter(o => o.name.toLowerCase().includes(search))
    .forEach((offer, index) => {
      table.innerHTML += `
        <tr class="${offer.stock < 5 ? "low-stock" : ""}">
          <td>${offer.name}</td>
          <td>${formatRupiah(offer.price)}</td>
          <td>${offer.stock}</td>
          <td>${offer.status}</td>
          <td>
            <button onclick="openModal(${index})">Edit</button>
            <button onclick="deleteOffer(${index})">Delete</button>
            <button onclick="toggleStatus(${index})">Toggle</button>
          </td>
        </tr>
      `;
    });

  updateStats();
  saveData();
}

function openModal(index = null) {
  document.getElementById("modal").style.display = "block";

  if (index !== null) {
    editIndex = index;
    name.value = offers[index].name;
    price.value = offers[index].price;
    stock.value = offers[index].stock;
  } else {
    editIndex = null;
    name.value = "";
    price.value = "";
    stock.value = "";
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function saveOffer() {
  const nameVal = document.getElementById("name").value;
  const priceVal = Number(document.getElementById("price").value);
  const stockVal = Number(document.getElementById("stock").value);

  let data = { name: nameVal, price: priceVal, stock: stockVal, status: "Active" };

  applyAutoPrice(data);

  if (editIndex !== null) {
    offers[editIndex] = { ...offers[editIndex], ...data };
  } else {
    offers.push(data);
  }

  closeModal();
  renderTable();
}

function deleteOffer(i) {
  offers.splice(i, 1);
  renderTable();
}

function toggleStatus(i) {
  offers[i].status = offers[i].status === "Active" ? "Paused" : "Active";
  renderTable();
}

renderTable();