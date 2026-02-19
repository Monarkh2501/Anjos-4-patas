let produtos = [
{
nome:"Brinquedo Anti-Ansiedade",
preco:39.90,
img:"https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd"
},
{
nome:"Cama Ultra Conforto",
preco:129.90,
img:"https://images.unsplash.com/photo-1583337130417-3346a1be7dee"
},
{
nome:"Coleira Premium",
preco:49.90,
img:"https://images.unsplash.com/photo-1583511655826-05700442b31b"
}
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function renderProdutos(){
let area = document.getElementById("produtos");
area.innerHTML="";

produtos.forEach((p,i)=>{
area.innerHTML+=`
<div class="card">
<img src="${p.img}">
<div class="card-content">
<h3>${p.nome}</h3>
<div class="preco">R$ ${p.preco.toFixed(2)}</div>
<button onclick="addCarrinho(${i})">Adicionar</button>
</div>
</div>`;
});
}

function addCarrinho(i){
carrinho.push(produtos[i]);
salvarCarrinho();
}

function removerItem(i){
carrinho.splice(i,1);
salvarCarrinho();
}

function salvarCarrinho(){
localStorage.setItem("carrinho",JSON.stringify(carrinho));
atualizarCarrinho();
}

function atualizarCarrinho(){
let lista=document.getElementById("lista");
lista.innerHTML="";
let total=0;

carrinho.forEach((item,i)=>{
total+=item.preco;
lista.innerHTML+=`
<li>
${item.nome} - R$ ${item.preco.toFixed(2)}
<button onclick="removerItem(${i})">X</button>
</li>`;
});

document.getElementById("total").innerText=total.toFixed(2);
document.getElementById("cartCount").innerText=carrinho.length;
}

function toggleCarrinho(){
document.querySelector(".carrinho").classList.toggle("active");
document.querySelector(".overlay").classList.toggle("active");
}

function finalizar(){
let total=0;
let msg="Pedido:%0A";

carrinho.forEach(i=>{
total+=i.preco;
msg+=i.nome+" R$ "+i.preco.toFixed(2)+"%0A";
});

msg+="%0ATotal: R$ "+total.toFixed(2);

window.open("https://wa.me/5511912552105?text="+msg);
}

renderProdutos();
atualizarCarrinho();

