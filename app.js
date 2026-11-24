/* ==========================================
   BENDITA ESCRITA - Lógica da Aplicação (app.js)
   ========================================== */

const products = [
  {
    id: 1,
    title: "Ecobag: O mundo é maior depois de um livro",
    category: "ecobags",
    tag: "Ecobags",
    price: "R$ 59,90",
    image: "imagens/01_ecobag_o_mundo_e_maior_depois_de_um_livro.png",
    description: "Ecobag em algodão cru com estampa exclusiva: 'O mundo é maior depois de um Livro — Paraisópolis - MG'. Resistente, prática e cheia de significado para carregar suas leituras e afetos por onde você for."
  },
  {
    id: 2,
    title: "Ecobag: Que todo dia seja Natal",
    category: "ecobags",
    tag: "Ecobags",
    price: "R$ 59,90",
    image: "imagens/02_ecobag_que_todo_dia_seja_natal.png",
    description: "Inspirada na magia dos encontros e no Caminho da Fé (Paraisópolis – MG), esta ecobag carrega a mensagem 'Que todo dia seja Natal'. Confeccionada com tecido sustentável e toque acolhedor."
  },
  {
    id: 3,
    title: "Ecobag: Fui ao encontro de Maria",
    category: "ecobags",
    tag: "Ecobags",
    price: "R$ 59,90",
    image: "imagens/03_ecobag_fui_ao_encontro_de_maria.png",
    description: "'Fui ao encontro de Maria e encontrei um pouco mais de mim'. Um tributo aos passos dados no Caminho da Fé em Paraisópolis - MG, unindo fé, introspecção e carinho."
  },
  {
    id: 4,
    title: "Ecobag: Jesus não mudou o caminho",
    category: "ecobags",
    tag: "Ecobags",
    price: "R$ 59,90",
    image: "imagens/04_ecobag_jesus_nao_mudou_o_caminho.png",
    description: "'Jesus não mudou o caminho, mudou quem caminhava'. Uma ecobag reflexiva e profunda, nascida entre as montanhas da Serra da Mantiqueira."
  },
  {
    id: 5,
    title: "Ecobag: Trem de Carregar Trem",
    category: "ecobags",
    tag: "Ecobags",
    price: "R$ 59,90",
    image: "imagens/05_ecobag_trem_de_carregar_trem.png",
    description: "Com um toque genuinamente mineiro, a ecobag 'Trem de Carregar Trem' celebra a simplicidade e a alegria de carregar o essencial com estilo e afeto."
  },
  {
    id: 6,
    title: "Ecobag: O Caminho da Fé termina...",
    category: "ecobags",
    tag: "Ecobags",
    price: "R$ 59,90",
    image: "imagens/06_ecobag_o_caminho_da_fe_termina.png",
    description: "'O Caminho da Fé termina, o que ele desperta permanece'. Leve para a sua rotina a lembrança viva dos momentos de transformação e paz."
  },
  {
    id: 7,
    title: "Caneca: Trem de Beber Trem",
    category: "canecas",
    tag: "Canecas",
    price: "R$ 44,90",
    image: "imagens/07_caneca_trem_de_beber_trem.png",
    description: "Caneca de cerâmica esmaltada com a frase 'Trem de Beber Trem — Caminho da Fé – Paraisópolis – MG'. Perfeita para saborear um bom café mineiro nas manhãs aconchegantes."
  },
  {
    id: 8,
    title: "Caneca: Caminhei, rezei e lembrei de você",
    category: "canecas",
    tag: "Canecas",
    price: "R$ 44,90",
    image: "imagens/08_caneca_caminhei_rezei_e_lembrei_de_voce.png",
    description: "'Caminhei, rezei e lembrei de você'. Um presente delicado e afetuoso para demonstrar carinho a quem mora no seu coração."
  },
  {
    id: 9,
    title: "Caneca: Café com Nossa Senhora Aparecida",
    category: "canecas",
    tag: "Canecas",
    price: "R$ 44,90",
    image: "imagens/09_caneca_cafe_com_nossa_senhora_aparecida.png",
    description: "Caneca inspirada na fé e na devoção do Caminho da Fé em Paraisópolis - MG. Um convite à oração e à pausa diária com muito significado."
  },
  {
    id: 10,
    title: "Caneca: Sem pressa e sem pausa",
    category: "canecas",
    tag: "Canecas",
    price: "R$ 44,90",
    image: "imagens/10_caneca_sem_pressa_e_sem_pausa.png",
    description: "'Sem pressa e sem pausa' — o ritmo perfeito para caminhar pela vida e apreciar cada gole de café com serenidade e alma leve."
  }
];

const WHATSAPP_NUMBER = "5535999999999"; // Substituir pelo número real se necessário

document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");
  setupFilters();
  setupModal();
});

function renderProducts(category) {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";

  const filtered = category === "all" 
    ? products 
    : products.filter(p => p.category === category);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-container" onclick="openModal(${product.id})">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <h3 class="product-title" onclick="openModal(${product.id})">${product.title}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${product.price}</span>
          <button class="btn-whatsapp-small" onclick="buyViaWhatsApp('${product.title}')">
            <i class="fab fa-whatsapp"></i> Comprar
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderProducts(category);
    });
  });
}

function buyViaWhatsApp(productTitle) {
  const message = encodeURIComponent(`Olá! Vim pelo site da Bendita Escrita e gostaria de saber mais sobre ${productTitle}.`);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank");
}

function setupModal() {
  const modalOverlay = document.getElementById("product-modal");
  const closeBtn = document.getElementById("modal-close");

  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById("modal-img").src = product.image;
  document.getElementById("modal-title").innerText = product.title;
  document.getElementById("modal-price").innerText = product.price;
  document.getElementById("modal-desc").innerText = product.description;

  const buyBtn = document.getElementById("modal-buy-btn");
  buyBtn.onclick = () => buyViaWhatsApp(product.title);

  document.getElementById("product-modal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("product-modal").classList.remove("active");
  document.body.style.overflow = "auto";
}
