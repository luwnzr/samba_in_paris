// Função para carregar reservas (para o admin)
if (window.location.pathname.includes("admin.html")) {
    fetch("http://localhost:3000/reservas")
      .then(response => response.json())
      .then(data => {
        const reservasList = document.getElementById("reservasList");
        reservasList.innerHTML = "";
        data.forEach(reserva => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.innerHTML = `
            <strong>Nome:</strong> ${reserva.nome}<br>
            <strong>Email:</strong> ${reserva.email}<br>
            <strong>Data:</strong> ${reserva.data}<br>
            <strong>Horário:</strong> ${reserva.horario}<br>
            <strong>Número de Pessoas:</strong> ${reserva.numero_pessoas}<br>
            <strong>Mensagem:</strong> ${reserva.mensagem || "Nenhuma mensagem"}
          `;
          reservasList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Erro ao carregar reservas:", error);
        alert("Erro ao carregar reservas.");
      });
  }
  
  // Função para exibir a área de reservas após o login
  if (window.location.pathname.includes("index.html")) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // Mostra a seção de reservas
      document.getElementById("reservas").style.display = "block";
  
      // Exibe o nome do usuário logado
      const welcomeMessage = document.createElement("p");
      welcomeMessage.textContent = `Bem-vindo, ${user.username}!`;
      document.getElementById("reservas").prepend(welcomeMessage);
    } else {
      // Oculta a seção de reservas se o usuário não estiver logado
      document.getElementById("reservas").style.display = "none";
    }
  }
  
  // Função para logout
  document.getElementById("logoutButton")?.addEventListener("click", function() {
    localStorage.removeItem("user"); // Remove o usuário do localStorage
    window.location.href = "index.html"; // Redireciona para a página inicial
  });