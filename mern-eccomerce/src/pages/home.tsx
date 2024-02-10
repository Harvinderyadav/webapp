import { Link } from "react-router-dom"
import ProductCard from "../components/product-card";


const  Home = () => {
  const addToCartHandler =()=>{};
  return (
    <div className= "home">
           <section>   
           </section> 
        <h1>
          Latest Products
          <Link to="/search" className="findmore">
            More
          </Link>
        </h1>
         <main>
          <ProductCard
          productId="adsdasd"
          name="mackbook"
          price={32849}
          stock={45}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/71S4sIPFvBL._SX679_.jpg"
          />
        </main>
    </div>
  )
}

export default Home;