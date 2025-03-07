import { useState } from "react";
import { FaSearch,
   FaShoppingBag, 
   FaSignInAlt,
    FaSignOutAlt, 
    FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user : User | null;
}
// const user = {_id: "asdfgerty", role:"admin"}

const Header = ({user}:PropsType) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        Home</Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch/>
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag/>
      </Link>

      {user?._id ? (
        <>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <FaUser/>
        </button>
        <dialog open={isOpen}>
          <div>
            {user.role ==="admin" && (
            <Link to="/admin/dashboard">admin</Link>
          )
          }
          <Link to="/orders"> Orders</Link>
          <button type="button" onClick={logoutHandler}>
            <FaSignOutAlt/>
            </button>
            </div>
        </dialog>
        </>
      ) : (
        <Link to={"login"}>
          <FaSignInAlt/>
        </Link>
      )}
    </nav>

    );
};

export default Header;