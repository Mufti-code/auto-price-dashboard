body {
  font-family: Arial;
  background: #0f172a;
  color: white;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.stats {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.card {
  flex: 1;
  background: #1e293b;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

input#search {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
}

button {
  padding: 8px 12px;
  margin: 3px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  color: white;
}

button:hover {
  opacity: 0.8;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #1e293b;
}

th, td {
  padding: 10px;
  text-align: center;
}

th {
  background: #334155;
}

.low-stock {
  background: rgba(255,0,0,0.2);
}

/* BUTTON COLORS */
button:nth-child(1) { background: #3b82f6; }
button:nth-child(2) { background: #ef4444; }
button:nth-child(3) { background: #f59e0b; }

/* MODAL */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
}

.modal-content {
  background: #1e293b;
  padding: 20px;
  margin: 100px auto;
  width: 300px;
  border-radius: 10px;
}