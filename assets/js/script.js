const produtos = [
  {id:1, nome:"Brinquedo Mordedor Premium", preco:29.90},
  {id:2, nome:"Coleira Luxo Ajustável", preco:39.90},
  {id:3, nome:"Caminha Confort Pet", preco:89.90}
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let desconto = 0;

const produtosDiv = document.getElementById("produtos");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");

document.getElementById("openCart").onclick = () => {
  cart.classList.add("open");
};

document.getElementById("closeCart").onclick = () => {
  cart.classList.remove("open");
};

function renderProdutos(){
  produtosDiv.innerHTML = "";
  produtos.forEach(p => {
    produtosDiv.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco}</p>
        <button onclick="addCarrinho(${p.id})">Adicionar</button>
      </div>
    `;
  });
}

function addCarrinho(id){
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  salvarCarrinho();
  renderCarrinho();
}

function removerItem(index){
  carrinho.splice(index,1);
  salvarCarrinho();
  renderCarrinho();
}

function renderCarrinho(){
  cartItems.innerHTML="";
  let total=0;

  carrinho.forEach((item,index)=>{
    total += item.preco;
    cartItems.innerHTML += `
      <p>
        ${item.nome} - R$ ${item.preco}
        <button onclick="removerItem(${index})">X</button>
      </p>
    `;
  });

  total = total - (total * desconto);

  document.getElementById("total").innerText = total.toFixed(2);
}

function salvarCarrinho(){
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function aplicarCupom(){
  const cupom = document.getElementById("cupom").value;

  if(cupom === "PRIME15" && !localStorage.getItem("cupomUsado")){
    desconto = 0.15;
    localStorage.setItem("cupomUsado", "sim");
    alert("Cupom aplicado!");
    renderCarrinho();
  } else {
    alert("Cupom inválido ou já utilizado.");
  }
}

function finalizarCompra(){
  let mensagem = "Olá, quero finalizar minha compra:%0A";

  carrinho.forEach(item => {
    mensagem += `${item.nome} - R$ ${item.preco}%0A`;
  });

  mensagem += `Total: R$ ${document.getElementById("total").innerText}`;

  window.open(`https://wa.me/5511912552105?text=${mensagem}`);
}

function contadorAnimado(){
  let numero = 1500;
  const el = document.getElementById("contador");

  setInterval(()=>{
    numero += Math.floor(Math.random()*3);
    el.innerText = numero;
  },4000);
}

renderProdutos();
renderCarrinho();
contadorAnimado();
