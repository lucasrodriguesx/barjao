export const validarPagamento = (formaPagamento, numeroCartao, nomeCartao, validade, cvv, cpf, email) => {
    if (formaPagamento === 'Cartão') {
      if (!numeroCartao || !nomeCartao || !validade || !cvv) {
        alert('Todos os campos de cartão devem ser preenchidos!');
        return false;
      }
    } else if (formaPagamento === 'Boleto') {
      if (!cpf || !email) {
        alert('Por favor, preencha o CPF e o Email.');
        return false;
      }
    } else if (formaPagamento === 'Pix') {
      // Pix não necessita de mais validações
    }
    return true;
  };
  