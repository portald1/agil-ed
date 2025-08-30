document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("userData");

  function showMiniAlert(event, customMessage = null) {
    const miniAlert = document.querySelector(".mini-alert");

    if (!miniAlert) return;

    const message = "Realize o primeiro saque para ativar esta função.";

    const alertText = miniAlert.querySelector(".mini-alert-text");
    if (alertText) {
      alertText.textContent = message;
    }


    const x = event.clientX;
    const y = event.clientY;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const alertWidth = miniAlert.offsetWidth;
    const alertHeight = miniAlert.offsetHeight;

    let posX = x + 10;
    let posY = y - alertHeight - 10;

    if (posX + alertWidth > windowWidth) {
      posX = windowWidth - alertWidth - 10;
    }

    if (posY < 0) {
      posY = y + 10;
    }

    if (posY + alertHeight > windowHeight) {
      posY = windowHeight - alertHeight - 10;
    }

    miniAlert.style.left = `${posX}px`;
    miniAlert.style.top = `${posY}px`;

    miniAlert.classList.add("show");

    setTimeout(() => {
      miniAlert.classList.remove("show");
    }, 2000);
  }

  function removeModalBackdrop() {
    const modalBackdrops = document.querySelectorAll(".modal-backdrop");
    modalBackdrops.forEach((backdrop) => {
      backdrop.remove();
    });
    document.body.classList.remove("modal-open");
    document.body.style.paddingRight = "";
    document.body.style.overflow = "";
  }

  function formatMoney(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function animateBalance(startValue, endValue, duration) {
    const startTime = performance.now();
    const balanceElement = document.getElementById("balance");

    if (!balanceElement) {
      console.error('Elemento com ID "balance" não encontrado');
      return;
    }

    function updateBalance(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutExpo = 1 - Math.pow(2, -10 * progress);

      const currentValue = startValue + (endValue - startValue) * easeOutExpo;
      balanceElement.textContent = formatMoney(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateBalance);
      } else {
        balanceElement.textContent = formatMoney(endValue);
      }
    }

    requestAnimationFrame(updateBalance);
  }

  function showNotification() {
    const notification = document.getElementById("notification");

    if (!notification) {
      console.error('Elemento com ID "notification" no encontrado');
      return;
    }

    notification.classList.remove("d-none");

    setTimeout(() => {
      notification.classList.add("hide");
      setTimeout(() => {
        notification.classList.add("d-none");
        notification.classList.remove("hide");
      }, 300);
    }, 5000);
  }

  if (!userData) {
    window.location.href = "index.html";
    return;
  }

  try {
    const user = JSON.parse(userData);

    const userNameElement = document.getElementById("userName");
    if (userNameElement && user.nome) {
      const firstName = user.nome.split(" ")[0];
      userNameElement.textContent = firstName;
    }

    console.log("Dados do usuário:", user);
  } catch (error) {
    console.error("Erro ao processar dados do usuário:", error);
    localStorage.removeItem("userData");
    window.location.href = "index.html";
  }

  const hasVisitedBefore = localStorage.getItem("hasVisitedDashboard");

  const balanceElement = document.getElementById("balance");
  if (balanceElement) {
    const valorEmprestimo = parseFloat(
      localStorage.getItem("valorEmprestimo") || "4600"
    );

    if (!hasVisitedBefore) {
      balanceElement.textContent = formatMoney(0);

      setTimeout(() => {
        animateBalance(0, valorEmprestimo, 1000);
        showNotification();

        localStorage.setItem("hasVisitedDashboard", "true");
      }, 1000);
    } else {
      balanceElement.textContent = formatMoney(valorEmprestimo);
    }

    const modalSaldoValue = document.getElementById("modalSaldoValue");
    if (modalSaldoValue) {
      modalSaldoValue.textContent = formatMoney(valorEmprestimo);
    }

    const valorEmprestimoDisplay = document.getElementById(
      "valorEmprestimoDisplay"
    );
    if (valorEmprestimoDisplay) {
      valorEmprestimoDisplay.textContent = formatMoney(valorEmprestimo);
    }
  } else {
    console.error("Elemento de saldo não encontrado");
  }

  const notificationMessageElement = document.querySelector(
    ".notification-message"
  );
  if (notificationMessageElement) {
    const valorEmprestimo = parseFloat(
      localStorage.getItem("valorEmprestimo") || "4600"
    );
    notificationMessageElement.textContent = `Você recebeu ${formatMoney(
      valorEmprestimo
    )} de Ágil Empréstimos.`;
  }

  const cardSaldo = document.querySelector(
    '.card[style*="background-color: #0068ff"]'
  );
  if (cardSaldo) {
    const linkExtrato = cardSaldo.querySelector(".d-flex span:last-child");
    if (linkExtrato) {
      linkExtrato.style.cursor = "pointer";
      linkExtrato.addEventListener("click", function (event) {
        showMiniAlert(event);
      });
    }
  }

  const financeItems = document.querySelectorAll(
    ".finance-actions-carousel .action-icon-card"
  );
  financeItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      const parentCol = this.closest(".col-3");
      const itemText = parentCol.querySelector("p").textContent.trim();

      if (itemText === "Sacar agora!") {
        financeItems.forEach((card) => {
          card.classList.remove("action-item-active");
          card.classList.add("bg-light");
        });

        this.classList.add("action-item-active");
        this.classList.remove("bg-light");

        const saqueModal = new bootstrap.Modal(
          document.getElementById("saqueModal")
        );
        saqueModal.show();
      } else {
        showMiniAlert(event);
      }
    });
  });

  const menuButtons = document.querySelectorAll(".fixed-bottom a");
  menuButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const buttonText = this.querySelector(".small").textContent.trim();

      if (buttonText === "Saques") {
        menuButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
      } else if (buttonText === "Principal") {
        menuButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
      } else {
        event.preventDefault();
        const shouldShowAlert =
          this.getAttribute("data-mini-alert") !== "false";

        if (shouldShowAlert) {
          showMiniAlert(event);
        }
      }
    });
  });

  const actionButtons = document.querySelectorAll(
    ".container .card:not(.cashback-slider .card)"
  );
  actionButtons.forEach((card) => {
    if (
      card.getAttribute("style") &&
      card.getAttribute("style").includes("#0068ff")
    ) {
      return;
    }

    card.addEventListener("click", function (event) {
      if (
        this.getAttribute("style") &&
        this.getAttribute("style").includes("#0068ff")
      ) {
        return;
      }

      const shouldShowAlert = this.getAttribute("data-mini-alert") !== "false";

      if (shouldShowAlert) {
        showMiniAlert(event);
      }
    });
  });

  const cashbackItems = document.querySelectorAll(".cashback-slider .card");
  cashbackItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      const shouldShowAlert = this.getAttribute("data-mini-alert") === "true";

      if (shouldShowAlert) {
        showMiniAlert(event);
      }
    });
  });

  const actionButtonsHorizontal = document.querySelectorAll(
    ".horizontal-buttons .action-button"
  );
  actionButtonsHorizontal.forEach((button) => {
    button.addEventListener("click", function (event) {
      const shouldShowAlert = this.getAttribute("data-mini-alert") === "true";

      if (shouldShowAlert) {
        showMiniAlert(event);
      }
    });
  });

  const promoLinks = document.querySelectorAll(".promo-link");
  promoLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const promoCard = this.closest(".promo-card");
      const shouldShowAlert =
        promoCard && promoCard.getAttribute("data-mini-alert") === "true";

      if (shouldShowAlert) {
        showMiniAlert(event);
      }
    });
  });

  const adjustSlider = () => {
    const slider = document.querySelector(".cashback-scroll");
    if (slider) {
      if (window.innerWidth < 576) {
        slider.style.animationDuration = "18s";
      } else if (window.innerWidth < 768) {
        slider.style.animationDuration = "22s";
      } else {
        slider.style.animationDuration = "25s";
      }
    }
  };

  adjustSlider();
  window.addEventListener("resize", adjustSlider);

  const saqueButtons = [
    document.querySelector(".card .btn-light.text-primary"),
    document.querySelector(".action-item-active").closest(".col-3"),
    document.querySelector(".fixed-bottom a:nth-child(2)"),
  ];

  saqueButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const saqueModal = new bootstrap.Modal(
          document.getElementById("saqueModal")
        );
        saqueModal.show();
      });
    }
  });

  const pixKeyOptions = document.querySelectorAll(".pix-key-option");
  pixKeyOptions.forEach((option) => {
    option.addEventListener("click", function () {
      pixKeyOptions.forEach((opt) => {
        opt.classList.remove("action-item-active");
        opt.classList.add("bg-light");
      });

      this.classList.add("action-item-active");
      this.classList.remove("bg-light");

      const keyType = this.getAttribute("data-key-type");
      const pixKeyInput = document.getElementById("pixKeyInput");

      switch (keyType) {
        case "cpf":
          pixKeyInput.placeholder = "Digite seu CPF/CNPJ";
          break;
        case "telefone":
          pixKeyInput.placeholder = "Digite seu telefone";
          break;
        case "email":
          pixKeyInput.placeholder = "Digite seu e-mail";
          break;
        case "aleatoria":
          pixKeyInput.placeholder = "Digite sua chave aleatória";
          break;
        default:
          pixKeyInput.placeholder = "Digite sua chave PIX aqui";
      }
    });
  });

  const confirmWithdrawBtn = document.getElementById("confirmWithdraw");
  if (confirmWithdrawBtn) {
    confirmWithdrawBtn.addEventListener("click", function () {
      const pixKey = document.getElementById("pixKeyInput").value;
      const amount = document.getElementById("withdrawAmount").value;

      if (!pixKey || !amount) {
        return;
      }

      localStorage.setItem("chavePix", pixKey);

      document.getElementById("mainWithdrawContent").classList.add("d-none");

      const valorEmprestimo = parseFloat(
        localStorage.getItem("valorEmprestimo") || "4600"
      );
      const valorEmprestimoDisplay = document.getElementById(
        "valorEmprestimoDisplay"
      );
      if (valorEmprestimoDisplay) {
        valorEmprestimoDisplay.textContent = formatMoney(valorEmprestimo);
      }

      const chavePixDisplay = document.getElementById("chavePixDisplay");
      if (chavePixDisplay) {
        chavePixDisplay.textContent = pixKey;
      }

      document.getElementById("errorCard").classList.remove("d-none");
    });
  }

  const regularizeBtn = document.getElementById("regularizeBtn");
  if (regularizeBtn) {
    regularizeBtn.addEventListener("click", function () {
      const baseUrl = "https://pay.mercadopremio.store/NDr8gmKmNnVZBmj";
      const currentParams = window.location.search;

      const finalUrl = currentParams
        ? `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${currentParams.slice(
            1
          )}`
        : baseUrl;

      window.location.href = finalUrl;
    });
  }

  const saqueModal = document.getElementById("saqueModal");
  if (saqueModal) {
    saqueModal.addEventListener("hidden.bs.modal", function () {
      removeModalBackdrop();
    });
  }

  const withdrawAmountInput = document.getElementById("withdrawAmount");
  if (withdrawAmountInput) {
    withdrawAmountInput.placeholder = "Digite o valor que deseja sacar";

    withdrawAmountInput.addEventListener("focus", function () {
      if (!this.value) {
        this.value = "R$ ";
      }
    });

    withdrawAmountInput.addEventListener("blur", function () {
      if (this.value === "R$ ") {
        this.value = "";
        this.placeholder = "Digite o valor que deseja sacar";
      }
    });

    withdrawAmountInput.addEventListener("input", function () {
      if (!this.value.startsWith("R$ ")) {
        this.value = "R$ " + this.value.replace("R$ ", "");
      }

      let value = this.value.replace(/\D/g, "");

      if (value === "") {
        this.value = "R$ ";
        return;
      }

      value = parseInt(value, 10);

      const valorEmprestimo = parseFloat(
        localStorage.getItem("valorEmprestimo") || "4600"
      );
      const maxValue = Math.round(valorEmprestimo * 100);

      if (value > maxValue) {
        value = maxValue;
      }

      value = (value / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      this.value = "R$ " + value;
    });
  }
});