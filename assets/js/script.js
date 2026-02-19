const produtosLista = [
{
id:1,
nome:"Caminha Luxo Premium",
preco:129.90,
imagem:"https://images.unsplash.com/photo-1601758228041-f3b2795255f1"
},
{
id:2,
nome:"Coleira Executiva Ajustável",
preco:59.90,
imagem:"https://images.unsplash.com/photo-1598137269418-1c1f0f6c3c9e"
},
{
id:3,
nome:"Brinquedo Interativo Elite",
preco:39.90,
imagem:"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e"
}
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
<img src="${p.imagem}">
<div class="card-content">
<h3>${p.nome}</h3>
<p>R$ ${p.preco.toFixed(2)}</p>
<button onclick="addCarrinho(${p.id})">Adicionar</button>
</div>
</div>
`;
});
}

function addCarrinho(id){
const produto = produtosLista.find(p => p.id === id);
carrinho.push(produto);
localStorage.setItem("carrinho",JSON.stringify(carrinho));
renderCarrinho();
}

function renderCarrinho(){
cartItems.innerHTML="";
let total=0;

carrinho.forEach((item,index)=>{
total+=item.preco;
cartItems.innerHTML+=`
<p>${item.nome} - R$ ${item.preco.toFixed(2)}
<button onclick="remover(${index})">X</button></p>
`;
});

total = total - (total*desconto);
document.getElementById("total").innerText=total.toFixed(2);
document.getElementById("cartCount").innerText=carrinho.length;
}

function remover(i){
carrinho.splice(i,1);
localStorage.setItem("carrinho",JSON.stringify(carrinho));
renderCarrinho();
}

function aplicarCupom(){
if(document.getElementById("cupom").value==="PRIME15"){
desconto=0.15;
renderCarrinho();
alert("15% aplicado!");
}else{
alert("Cupom inválido");
}
}

function finalizarCompra(){
let msg="Olá quero comprar:%0A";
carrinho.forEach(item=>{
msg+=`${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
});
window.open(`https://wa.me/5511912552105?text=${msg}`);
}

renderProdutos();
renderCarrinho();

let numero=2500;
setInterval(()=>{
numero+=Math.floor(Math.random()*3);
document.getElementById("contador").innerText=numero;
},3000);
