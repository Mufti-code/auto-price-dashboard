let data = JSON.parse(localStorage.getItem("products")) || [];

function render() {
  const body = document.getElementById("tableBody");
  const search = document.getElementById("search").value.toLowerCase();

  body.innerHTML = "";

  data
    .filter(item => item.name.toLowerCase().includes(search))
    .forEach((item, i) => {
      body.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.stock}</td>
          <td class="${item.active ? 'active' : 'paused'}">
            ${item.active ? 'Active' : 'Paused'}
          </td>
          <td>
            <button onclick="toggle(${i})">Toggle</button>
            <button onclick="del(${i})">Delete</button>
          </td>
        </tr>
      `;
    });

  localStorage.setItem("products", JSON.stringify(data));
}

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* 🔥 FIX UTAMA DISINI */
function saveOffer() {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const stock = document.getElementById("stock").value.trim();

  // VALIDASI
  if (!name || !price || !stock) {
    alert("Isi semua field dulu bro!");
    return;
  }

  const newItem = {
    name: name,
    price: Number(price),   // FIX: pakai Number
    stock: Number(stock),
    active: true
  };

  data.push(newItem);

  // CLEAR INPUT
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("stock").value = "";

  closeModal();
  render();
}

function toggle(i) {
  data[i].active = !data[i].active;
  render();
}

function del(i) {
  data.splice(i, 1);
  render();
}

render();