let data = JSON.parse(localStorage.getItem("products")) || [];

function render() {
  const body = document.getElementById("tableBody");
  body.innerHTML = "";

  data.forEach((item, i) => {
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

function saveOffer() {
  const name = document.getElementById("name").value;
  const price = parseInt(document.getElementById("price").value) || 0;
  const stock = document.getElementById("stock").value;

  data.push({ name, price, stock, active: true });

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