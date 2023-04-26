import Product from "./Product.js";
import useSWR from "swr";
import Loader from "./Loader.js";
import fetcher from "../fetcher.js";
import NoAuth from "./NoAuth.js";
import { Card } from "react-bootstrap";

export default function Products(props) {
  const {
    data: products = [],
    loading,
    error,
  } = useSWR(
    "https://react-tutorial-demo.firebaseio.com/supermarket.json",
    fetcher
  );

  if (!localStorage.getItem("isLoggedIn")) {
    return (<NoAuth />)
  }

  return (
    <Card>
      <Card.Header as="h5" className='text-center'>Products</Card.Header>
      <Card.Body>
        <div className="products-layout">
          <h6>Take a look at our products</h6>
          <div className="products-grid">
            {loading && <Loader />}
            {error && (
              <p>
                There was an error loading the products. Please try again later.
              </p>
            )}
            {products.map((product) => {
              return (
                <Product
                  key={product.id}
                  details={product}
                  cart={props.cart}
                  onProductAdd={props.onProductAdd}
                  onProductDelete={props.onProductDelete}
                />
              );
            })}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
