import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { server } from "../redux/store";

type CartItemProps = {
    cartItem: CartItem;
    incrementHandler: (cartItem: CartItem) => void;
    decrementHandler: (cartItem: CartItem) => void;
    removeHandler: (id: string) => void;
  };
  const CartItem = ({
    cartItem,
    incrementHandler,
    decrementHandler,
    removeHandler,
  }: CartItemProps) => {
    const { photo, productId, name, price, quantity } = cartItem;
  

  return (
    <div className="cart-item">
        <img src={`${server}/${photo}`} alt={name} />
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span> Rs{price}</span>
        </article>
        <div>
            <button type='button' onClick={() => decrementHandler(cartItem)}>-</button>
            <p>{quantity}</p>
            <button type='button' onClick={() => incrementHandler(cartItem)}>+</button>
        </div>
        <div>
            <button type='button' onClick={() => removeHandler(productId)}>
            <FaTrash />fa
             </button>
        </div>
    </div> 
  );
};

export default CartItem; 