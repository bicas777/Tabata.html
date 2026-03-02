// Seleção de elementos
const opcoesBtns = document.querySelectorAll('.opcoes-btn');
const productName = document.getElementById('product-name');
const productImage = document.getElementById('product-image');
const productPrice = document.getElementById('product-price');
const paymentForm = document.getElementById('payment-form');
const clickSound = document.getElementById('click');
const siteOpcoes = document.getElementById('site-opcoes');
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const outrosInput = document.getElementById('outros-input');

// Pop-ups
const popupOutros = document.getElementById('popup');
const btnFecharOutros = document.getElementById('close-popup');
const popupPedido = document.getElementById('popupbotao');
const btnFecharPedido = document.getElementById('fecharPopup');

// Texto abaixo do botão
const textoDebaixo = document.getElementById('textodebaixo');

// Som do clique
clickSound.volume = 0.05;

// Inicialmente esconde elementos
paymentForm.style.display = 'none';
siteOpcoes.style.display = 'none';
outrosInput.style.display = 'none';
textoDebaixo.classList.remove('show');
qrContainer.style.display = 'none';

// Função de animação da imagem
function animarImagem() {
  productImage.classList.remove('animar-imagem');
  void productImage.offsetWidth;
  productImage.classList.add('animar-imagem');
}

// Função para gerar QR Code Pix fixo por produto/opção
function gerarPixQRCode(produto) {
  qrContainer.innerHTML = '';

  let pixPayload = '';

  switch(produto) {
    case 'Thumbnail':
      pixPayload = '00020126580014BR.GOV.BCB.PIX0136678a497f-75ff-4ce6-a946-b27931b815a0520400005303986540540.005802BR5912Enzo Bicalho6014Belo Horizonte62140510PAGAMENTOS63042724';
      break;
    case 'Anuncio':
      pixPayload = '00020126580014BR.GOV.BCB.PIX0136678a497f-75ff-4ce6-a946-b27931b815a0520400005303986540570.005802BR5912Enzo Bicalho6014Belo Horizonte62140510PAGAMENTOS63041DFC'; // substitua pelo QR real
      break;
    case 'Codigos':
      pixPayload = '00020126580014BR.GOV.BCB.PIX0136678a497f-75ff-4ce6-a946-b27931b815a0520400005303986540590.005802BR5912Enzo Bicalho6014Belo Horizonte62140510PAGAMENTOS6304DA0C'; // substitua pelo QR real
      break;
    case 'Site Completo - Loja':
      pixPayload = '00020126580014BR.GOV.BCB.PIX0136678a497f-75ff-4ce6-a946-b27931b815a05204000053039865406500.005802BR5912Enzo Bicalho6014Belo Horizonte62140510PAGAMENTOS63049466'; // QR real
      break;
    case 'Site Completo - Rede Social':
      pixPayload = '00020126580014BR.GOV.BCB.PIX0136678a497f-75ff-4ce6-a946-b27931b815a05204000053039865406300.005802BR5912Enzo Bicalho6014Belo Horizonte62140510PAGAMENTOS63040A54'; // QR real
      break;
    case 'Site Completo - Portfólio':
      pixPayload = '00020126580014BR.GOV.BCB.PIX0136678a497f-75ff-4ce6-a946-b27931b815a05204000053039865406200.005802BR5912Enzo Bicalho6014Belo Horizonte62140510PAGAMENTOS630430A3'; // QR real
      break;
    default:
      qrContainer.style.display = 'none';
      return;
  }

  const qrImg = document.createElement('img');
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixPayload)}`;
  qrImg.alt = 'QR Code Pix';

  qrContainer.appendChild(qrImg);
  qrContainer.style.display = 'block';
}

// Função para obter valor do produto
function getValorProduto(nomeProduto) {
  switch(nomeProduto) {
    case 'Thumbnail': return 40;
    case 'Anuncio': return 70;
    case 'Codigos': return 90;
    case 'Site Completo': return 250;
    default: return 0;
  }
}

// Seleção de produto
opcoesBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    opcoesBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    clickSound.currentTime = 0;
    clickSound.play();

    paymentForm.style.display = 'flex';
    outrosInput.style.display = 'flex';
    outrosInput.style.flexDirection = 'column';
    textoDebaixo.classList.add('show');

    productName.textContent = btn.dataset.name;
    productImage.src = btn.dataset.img;
    let valor = getValorProduto(btn.dataset.name);
    productPrice.textContent = `R$ ${valor}`;

    siteOpcoes.style.display = btn.dataset.name === 'Site Completo' ? 'block' : 'none';

    animarImagem();

    // Passa o nome do produto para gerar QR fixo
    gerarPixQRCode(btn.dataset.name);
  });
});

// Dropdown Site Completo
dropdownBtn.addEventListener('click', () => {
  dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    dropdownContent.style.display = 'none';

    if (item.textContent === 'Outros...') {
      productName.textContent = 'Site: Outros...';
      productPrice.textContent = 'R$ a definir';
      popupOutros.style.display = 'flex';
      setTimeout(() => popupOutros.classList.add('show'), 10);
      qrContainer.style.display = 'none';
    } else {
      const nomeProduto = `Site Completo - ${item.textContent}`;
      productName.textContent = nomeProduto;

      let valor = 0;
      switch(item.textContent){
        case 'Loja': valor = 500; break;
        case 'Rede Social': valor = 300; break;
        case 'Portfólio': valor = 200; break;
      }
      productPrice.textContent = `R$ ${valor}`;

      // Gera QR fixo para a opção selecionada
      gerarPixQRCode(nomeProduto);
    }

    animarImagem();
  });
});

// Fecha dropdown clicando fora
window.addEventListener('click', (e) => {
  if (!siteOpcoes.contains(e.target) && !dropdownBtn.contains(e.target)) {
    dropdownContent.style.display = 'none';
  }
});

// Botão Pagar Agora
document.getElementById('pay-button').addEventListener('click', (e) => {
  e.preventDefault();
  popupPedido.style.display = 'flex';
  setTimeout(() => popupPedido.classList.add('show'), 10);
});

// Fechar pop-ups
btnFecharOutros.addEventListener('click', () => {
  popupOutros.classList.remove('show');
  setTimeout(() => { popupOutros.style.display = 'none'; }, 300);
});

btnFecharPedido.addEventListener('click', () => {
  popupPedido.classList.remove('show');
  setTimeout(() => { popupPedido.style.display = 'none'; }, 300);
});
