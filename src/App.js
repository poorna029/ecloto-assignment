import {useState,useEffect} from "react";
import './App.css';
import Product from './Cart'

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };

const THRESHOLD = 1000;



function App() {
  const [items , setItems]=useState([]) ;
  const [total,setTotal]= useState(0);



    const addItemToCart = (item)=> {
//     

if (!item || !item.id) {
  console.warn("Invalid item passed to addItemToCart:", item);
  return;
}

setTotal(prev => prev + item.price);

const itemInCart = items.find(x => x.id === item.id);
if (itemInCart) {
  setItems(prev =>
    prev.map(fItem =>
      fItem.id === item.id ? { ...fItem, qty: fItem.qty + 1 } : fItem
    )
  );
} else {
  setItems(prev => [...prev, { ...item, qty: 1 }]);
}
};

  

  const removeItemFromCart = (item)=> {

    
if (!item || !item.id) {
  console.warn("Invalid item passed to removeItemFromCart:", item);
  return;
}

const itemInCart = items.find(x => x.id === item.id);
if (!itemInCart) return;

setTotal(prev => prev - item.price);

if (itemInCart.qty === 1) {
  setItems(prev => prev.filter(fItem => fItem.id !== item.id));
} else {
  setItems(prev =>
    prev.map(fItem =>
      fItem.id === item.id ? { ...fItem, qty: fItem.qty - 1 } : fItem
    )
  );
}}
  

  return (
    <div className="App">
      <main className="main-container">
        <header className="heading">Shopping Cart</header>
        <section className="products-container">
          <h3>Products</h3>
          <div className="cards-container">
            {PRODUCTS.map(product=>
            <div key={product.id}  className="card-container">
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <button className="cart-button" onClick={()=>addItemToCart(product)}>Add to Cart</button>
            </div>
            )}
          </div>
        </section>
        <section className="cart-summary">
          <h3>Cart Summary</h3>
          <div className="subtotal-description-box">
            <div className="subtotal-top-text">
            <h4>Subtotal : </h4>
            <h5>₹{total}</h5>
            </div>
            
            <hr classname="hr" ></hr>
            <div className="progress-section">
              {total<1000? 
              <>
              <h6>Add ₹{1000-total} more to get a Free Wireless Mouse!</h6>
              <progress className="progress" id="progress" max="1000" value={total}>50%</progress>
              </>:<h6>You got a free Wireless Mouse!</h6> }
            </div>
          </div>
        </section>
        {items?.length>0? 
        <section className="cart-items-section">
         <h3>Cart Items</h3>
          
          <div className="cart-items-box">
            
            {items.map(x=><Product key={x.id} x={x} removeItemFromCart={removeItemFromCart} addItemToCart={addItemToCart}/>)
              }
              {total>=1000? <div key={FREE_GIFT.id} className="cart-item">
            
            <div >
              <h4>{FREE_GIFT.name}</h4>
              <p className="price-text">₹{FREE_GIFT.price} X {1} = ₹{FREE_GIFT.price*1}</p>
            </div>
            <div className="plus-minus-section">
              <p className="qty green">Free Gift</p>
            </div>
            </div>:null}
            
          </div>
          
        </section>:
        <section className="empty-cart-section">
          <h6>Your cart is empty</h6>
          <p>Add some products to see them here !</p>
          </section>}
      </main>
    </div>
  );
}

export default App;
