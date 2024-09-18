import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/cart-item";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";
import { useDispatch, useSelector } from "react-redux";


const Cart = () => {
    const { cartItems, subtotal, tax, total, shippingCharges, discount } =
      useSelector((state: RootState) => state.cartReducer);
    const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>
  (false);
  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(()=>{
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
          .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
        cancelToken,
      })
      .then((res) => {
        dispatch(discountApplied(res.data.discount));
        setIsValidCouponCode(true);
        dispatch(calculatePrice());
      })
      .catch(() => {
        dispatch(discountApplied(0));
        setIsValidCouponCode(false);
        dispatch(calculatePrice());
      });
  }, 1000);
      return()=> {
        clearTimeout(timeOutID);
        cancel();
        setIsValidCouponCode(false);
      };
    }, [couponCode]);

    useEffect(() => {
      dispatch(calculatePrice());
    }, [cartItems]);  

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => 
            <CartItemCard 
            incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i}
              />
          )) : (
            <h1> No items added</h1>
          )} 
      </main>

      <aside>
        <p>Subtotal: Rs{subtotal}</p>
        <p>Shipping Charges: Rs{shippingCharges}</p>
        <p>Shipping Charges: Rs{shippingCharges}</p>
        <p>Tax: rs{tax}</p>
        <p>
          Discount: <em> - Rs{discount}</em>
        </p>
        <p>
          <b> Total: RS{total}</b>
        </p>
        <input 
        type="text"
        placeholder="coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}/>   


        {couponCode &&
         (isValidCouponCode ? (
          <span className="green">
            Rs{discount} off using the <code>{couponCode}</code>
          </span>
        ) : (<span className="red">
          Invalid Coupon<VscError/>
        </span>
        ))}
        {cartItems.length> 0 && <Link to="/shipping"> Checkout</Link>}

      </aside>
    </div>
  )
}

export default Cart;