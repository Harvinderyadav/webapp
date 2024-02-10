import { useState } from "react";
import ProductCard from "../components/product-card";


const Search = () => {

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler =() => {};

  const isPrevPage = page > 1;
  const ispNextPage = page <4;

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort}
           aria-label="label for the select" 
           onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (high to Low)</option>
          </select>
        </div>
        <div>
          <h4> Max Price: {maxPrice|| ""}</h4>
          <input 
          placeholder="$$$"
          type="range"
          min={100}
          max={10000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}/>

          </div>
          <div>
          <h4>Category</h4>
          <select value={category}
           aria-label="label for the select" 
           onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="asc">Sample 1</option>
            <option value="dsc">Sample 2</option>
          </select>
          </div>
        </aside>
        <main>
          <h1>Products</h1>
          <input type="text"
          placeholder="Search by name...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}/>
          <div className="search-product-list">
            <ProductCard productId="adsdasd"
          name="mackbook"
          price={32849}
          stock={45}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/71S4sIPFvBL._SX679_.jpg"
          />

          </div>
          <article>
            <button 
            type="button"
            disabled={!isPrevPage} onClick={()=>setPage((prev)=> prev-1)}>Prev</button>
            <span>
              {page} of {4}
            </span>
            <button 
            type="button"
            disabled={!ispNextPage} onClick={()=>setPage((next)=> next+1)}> Next</button>
          </article>
        </main>
        </div>
  )
}

export default Search