document.addEventListener("DOMContentLoaded", function () {
  const solicitarButtons = document.querySelectorAll(".btn-success");

  solicitarButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const currentParams = window.location.search;
      const baseUrl = "2/index.html";

      // Adiciona os parÃ¢metros UTM se existirem
      const finalUrl = currentParams
        ? `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${currentParams.slice(
            1
          )}`
        : baseUrl;

      window.location.href = finalUrl;
    });
  });

  const actionButtons = document.querySelectorAll(".action-btn");

  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.querySelector("span:last-child").textContent;
      if (buttonText.includes("Simule")) {
        scrollToOptions();
      }
    });
  });

  function scrollToOptions() {
    const creditOptions = document.querySelector(".credit-options");
    if (creditOptions) {
      creditOptions.scrollIntoView({ behavior: "smooth" });
    }
  }

  let clientCount = 46;
  setInterval(() => {
    clientCount++;
    const counterElement = document.querySelector(
      ".feedback-badge span:last-child"
    );
    if (counterElement) {
      counterElement.textContent = `Mais de ${clientCount} mil clientes satisfeitos`;
    }
  }, 60000);

  const currentYear = new Date().getFullYear();
  const yearElement = document.querySelector(".footer-bottom p:first-child");
  if (yearElement) {
    yearElement.textContent = yearElement.textContent.replace(
      /\d{4}/,
      currentYear
    );
  }

  const cpfInput = document.getElementById("cpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", function (e) {
      this.value = this.value.replace(/\D/g, "");
    });

    const cpfForm = document.getElementById("cpf-form");
    if (cpfForm) {
      cpfForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const cpf = cpfInput.value.trim();

        if (cpf.length !== 11) {
          alert("Por favor, digite um CPF vÃ¡lido com 11 dÃ­gitos.");
          return;
        }
      });
    }
  }
});