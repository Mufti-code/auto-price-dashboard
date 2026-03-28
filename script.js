let data = JSON.parse(localStorage.getItem("data")) || [];
let chart;

// FORMAT
function rp(n){return "Rp " + Number(n).toLocaleString("id-ID");}

// TOAST
function toast(msg){
  const t=document.getElementById("toast");
  t.innerText=msg;
  t.style.display="block";
  setTimeout(()=>t.style.display="none",2000);
}

// RENDER
function render(){
  const body=document.getElementById("body");
  const search=document.getElementById("search").value.toLowerCase();

  body.innerHTML="";

  data.filter(x=>x.name.toLowerCase().includes(search))
  .forEach((x,i)=>{
    body.innerHTML+=`
    <tr>
      <td>${x.name}</td>
      <td>${rp(x.price)}</td>
      <td>${x.stock}</td>
      <td class="${x.active?'active':'paused'}">
        ${x.active?'Active':'Paused'}
      </td>
      <td>
        <button onclick="toggle(${i})">Toggle</button>
        <button onclick="del(${i})">Delete</button>
      </td>
    </tr>`;
  });

  updateStats();
  updateChart();

  localStorage.setItem("data",JSON.stringify(data));
}

// STATS
function updateStats(){
  total.innerText=data.length;
  stock.innerText=data.reduce((a,b)=>a+b.stock,0);
  active.innerText=data.filter(x=>x.active).length;
}

// CHART
function updateChart(){
  const ctx=document.getElementById("chart");

  if(chart) chart.destroy();

  chart=new Chart(ctx,{
    type:"bar",
    data:{
      labels:data.map(x=>x.name),
      datasets:[{
        label:"Stock",
        data:data.map(x=>x.stock)
      }]
    }
  });
}

// MODAL
function openModal(){modal.style.display="flex";}
function closeModal(){modal.style.display="none";}

// SAVE
function save(){
  const name=nameInput.value;
  const price=parseInt(priceInput.value)||0;
  const stock=parseInt(stockInput.value)||0;

  data.push({name,price,stock,active:true});

  closeModal();
  toast("Product added!");
  render();
}

// ACTION
function toggle(i){
  data[i].active=!data[i].active;
  toast("Status updated");
  render();
}

function del(i){
  if(confirm("Delete product?")){
    data.splice(i,1);
    toast("Deleted");
    render();
  }
}

render();