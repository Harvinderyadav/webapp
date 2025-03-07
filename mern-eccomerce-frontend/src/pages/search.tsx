import { useState } from "react";
import ProductCard from "../components/product-card";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";


const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });


  const addToCartHandler =() => {};

  const isPrevPage = page > 1;
  const ispNextPage = page <4;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

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
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
          </div>
        </aside>
        <main>
          <h1>Products</h1>
          <input type="text"
          placeholder="Search by name...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}/>

{productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="search-product-list">
            {searchedData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))}
          </div>
        )}

          {searchedData && searchedData.totalPage > 1 && (
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
          )}
        </main>
        </div>
  )
}

export default Search;