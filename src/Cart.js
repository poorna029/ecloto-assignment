

function Cart({ x, addItemToCart, removeItemFromCart }) {
    if (!x || !x.id) return null; // guard against bad props
  
    return (
      <div className="cart-item">
        <div>
          <h4>{x.name}</h4>
          <p className="price-text">₹{x.price} X {x.qty} = ₹{x.price * x.qty}</p>
        </div>
        <div className="plus-minus-section">
          <button className="reduce" onClick={() => removeItemFromCart(x)}> - </button>
          <p className="qty">{x.qty}</p>
          <button className="increase" onClick={() => addItemToCart(x)}> + </button>
        </div>
      </div>
    );
  }
  
  export default Cart;