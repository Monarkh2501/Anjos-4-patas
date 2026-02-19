const produtosLista = [
  {id:1, nome:"Brinquedo Interativo Premium", preco:39.90},
  {id:2, nome:"Caminha Confort Plus", preco:109.90},
  {id:3, nome:"Coleira Luxo Ajustável", preco:49.90}
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let desconto = 0;

const produtosDiv = document.getElementById("produtos");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");

document.getElementById("openCart").onclick = () => cart.classList.add("open");
document.getElementById("closeCart").onclick = () => cart.classList.remove("open");

function renderProdutos(){
  produtosDiv.innerHTML="";
  produtosLista.forEach(p=>{
    produtosDiv.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2)}</p>
        <button onclick="addCarrinho(${p.id})">Adicionar</button>
      </div>
    `;
  });
}

function addCarrinho(id){
  const produto = produtosLista.find(p => p.id === id);
  carrinho.push(produto);
  salvarCarrinho();
  renderCarrinho();
}

function salvarCarrinho(){
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function removerItem(i){
  carrinho.splice(i,1);
  salvarCarrinho();
  renderCarrinho();
}

function renderCarrinho(){
  cartItems.innerHTML=""; 
  let total = 0;
  carrinho.forEach((item,index)=>{
    total += item.preco;
    cartItems.innerHTML += `
      <p>${item.nome} - R$ ${item.preco.toFixed(2)}
      <button onclick="removerItem(${index})">X</button>
      </p>
    `;
  });
  total = total - (total * desconto);
  document.getElementById("total").innerText = total.toFixed(2);
}

function aplicarCupom(){
  const cupom = document.getElementById("cupom").value;
  if(cupom==="PRIME15" && !localStorage.getItem("cupomUsado")){
    desconto = 0.15;
    localStorage.setItem("cupomUsado", "true");
    alert("15% de desconto aplicado!");
    renderCarrinho();
  } else alert("Cupom inválido ou já usado.");
}

function finalizarCompra(){
  let msg = "Olá! Quero finalizar:%0A";
  carrinho.forEach(item => msg += `${item.nome} - R$ ${item.preco.toFixed(2)}%0A`);
  msg += `Total: R$ ${document.getElementById("total").innerText}`;
  window.open(`https://wa.me/5511912552105?text=${msg}`);
}

let numero = 2000;
const el = document.getElementById("contador");
setInterval(() => {
  numero += Math.floor(Math.random()*4);
  el.innerText = numero;
}, 3000);

renderProdutos();
renderCarrinho();
