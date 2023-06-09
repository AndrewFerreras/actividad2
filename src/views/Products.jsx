import Header from "../components/Header";
import SearchBar from "../components/searchBar";
import { useSearchProducts } from "../hooks/useSearchProducts";
import { useProducts } from "../hooks/useProducts";
import { useCallback } from "react";
import debounce from "just-debounce-it";
import Card from "../components/Card";
import Footer from "../components/Footer";
import '../css/styles.css'
const Products = () => {
  const { search, updateSearch, error } = useSearchProducts();
  const { products, getProducts, loading } = useProducts({ search });

  const debouncedGetProducts = useCallback(
    debounce((search) => {
      getProducts({ search });
    }, 500),
    [getProducts]
  );
  
  const handleSearch = (event) => {
    event.preventDefault();
    getProducts({ search });
  };

  const handleInputChange = (event) => {
    const newProductSearch = event.target.value;
    updateSearch(newProductSearch);
    debouncedGetProducts(newProductSearch);
  };
console.log(products)
  return (
    <>
      <Header />
      <section className="container-search">
        <SearchBar
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
        />
        {error}
      </section>
      {
          
      }
      <section className="productos-destacados">
        <div className="container">
          <div className="row">
              {loading ? (
                <p>cargando</p>
              ) : (
                
                  products?.map((product) => (
                     <div className="col-md-4">
                    <Card
                      pimagen={product.image}
                      ptitle={product.title}
                      Id={product.id}
                      key={product.id}
                    />
                    </div>
                  ))
               
              )}
            </div>
          </div>
        
      </section>
      <Footer/>
    </>
  );
};

export default Products;
