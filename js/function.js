'use strict';

//Elements
const body = document.querySelector('body');
const content = document.querySelector('.product');
const orderBox = document.querySelector('.shopping-detail');
const orderList = document.querySelector('.order-box');
const totalPrice = document.querySelector('.total-price');
const overlay = document.querySelector('.overlay');
const cartBtn = document.querySelector('.cart');
const closeList = document.querySelector('.close');
const deleteAllBtn = document.querySelector('.deleteall-btn');

let buttons = [];
let item, itemPrice, itemImg, itemAmount;
let productOrder = [];


//UI - Get Donuts from Array
let results = "";


Food.forEach(({
  name,
  img,
  price,
  id
}) => {
  results += `<div class="product-box">
                <div class="product-img">
                  <img src="${img}" alt""/>
                </div>
              <div class="product-info">
              <span></span>
              <p class="name">${name}</p>
              <p class="price">₩${price}</p>
              </div>
              <div class="add-btn" value=${id-1}>+ Add</div>
              </div>`
})

content.innerHTML = results;

//Add To Cart
const addBtns = [...document.querySelectorAll('.add-btn')];
buttons = addBtns;

for (let i = 0; i < addBtns.length; i++) {
  addBtns[i].addEventListener('click', () => {
    cartNumbers(Food[i]);
    totalCoast(Food[i]);
    displayOrder(Food[i]);

  })
}


function onLoadCartNumber() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    cartBtn.setAttribute('data-count', productNumbers);
    cartBtn.classList.add('add-numb');
  }


}


function cartNumbers(product) {
  console.log(product)
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1)
    cartBtn.setAttribute('data-count', productNumbers + 1);
    cartBtn.classList.add('add-numb');
  } else {
    localStorage.setItem('cartNumbers', 1);
    cartBtn.setAttribute('data-count', 1);
    cartBtn.classList.add('add-numb');
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {

    if (cartItems[product.id] == undefined) {
      cartItems = {
        ...cartItems,
        [product.id]: product
      }
    }
    cartItems[product.id].inCart += 1;
  } else {
    product.inCart = 1;

    cartItems = {
      [product.id]: product
    }
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}


function totalCoast(product) {
  let cartCost = JSON.parse(localStorage.getItem('totalCost'));

  if (cartCost != null) {
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }


}

function displayOrder(product){
  const div = document.createElement('div');
  div.classList.add('order-list');
    div.innerHTML = '';
      div.innerHTML += `<div><div class="order-food">
    <img src="${product.img}">
    </div>
    <div class="order-info">
    <p class="order-product">${product.name}</p>
    <p class="order-price">₩${product.price * (product.inCart+1)}</p>
    </div>
    <div class="order-amount">
    <p class="countUp xi-caret-up-min"></p>
    <span class="item-amount">${product.inCart}</span>
    <p class="countDown xi-caret-down-min"></p>
    </div>
    <div><i class="xi-trash"></i></div></div>
    `;

    orderList.appendChild(div);

  let cost = JSON.parse(localStorage.getItem('totalCost'));
  totalPrice.innerHTML = cost.toLocaleString(); 
}


//reload cart, display cart ui
function displayCart() {
  let cartItem = JSON.parse(localStorage.getItem('productsInCart'));
  const div = document.createElement('div');
  div.classList.add('order-list');

  if (cartItem && orderList) {
    div.innerHTML = '';
    Object.values(cartItem).map(item => {
      div.innerHTML += `<div><div class="order-food">
    <img src="${item.img}">
    </div>
    <div class="order-info">
    <p class="order-product">${item.name}</p>
    <p class="order-price">₩${item.price * item.inCart}</p>
    </div>
    <div class="order-amount">
    <p class="countUp xi-caret-up-min"></p>
    <span class="item-amount">${item.inCart}</span>
    <p class="countDown xi-caret-down-min"></p>
    </div>
    <div><i class="xi-trash"></i></div></div>
    `;
    })

    orderList.appendChild(div);

  }

  let cost = JSON.parse(localStorage.getItem('totalCost'));
  totalPrice.innerHTML = cost.toLocaleString();

}

//show OrerList
cartBtn.addEventListener("click", () => {
  orderBox.classList.add('active');
  overlay.classList.add('active');
  body.classList.add('noscroll');
})

//Close OderList
closeList.addEventListener("click", () => {
  orderBox.classList.remove('active');
  overlay.classList.remove('active');
  body.classList.remove('noscroll');
})

//delte
deleteAllBtn.addEventListener('click', () =>{
  orderList.remove();
  cartBtn.classList.remove('add-numb');
  totalPrice.innerHTML = '';
  localStorage.removeItem('totalCost');
  localStorage.removeItem('cartNumbers');
  localStorage.removeItem('productsInCart');
})

onLoadCartNumber();
displayCart();

