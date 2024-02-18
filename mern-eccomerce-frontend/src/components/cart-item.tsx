import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItemProps = {
    cartItem: any;
};

const CartItem = ({cartItem}: CartItemProps) => {
    const { photo, productId, name, price, quantity} = cartItem;

  return (
    <div className="cart-item">
        <img src={photo} alt={name} />
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span> Rs{price}</span>
        </article>
        <div>
            <button type='button'>-</button>
            <p>{quantity}</p>
            <button type='button'>+</button>
        </div>
        <div>
            <button type='button'>
            <FaTrash />fa
             </button>
        </div>
    </div> 
  );
};

export default CartItem;