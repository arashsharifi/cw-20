import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Heading } from "../../base";
import { Grid } from "../../layout";
import { ProductCard } from "../productCard";
import { ProductModal } from "../productModal";
import { ProductReducer } from "../../../reducers/product-reducer";
import axios from "axios";
const P = styled.p`
  text-align: center;
  font-family: Poppins;
  margin-bottom: 40px;
`;

export const Products = () => {
  const [showingProduct, setShowingProduct] = useState(null);
  const [products, dispatch] = useReducer(ProductReducer, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          "https://fakestoreapi.com/products?limit=5"
        );
        console.log(data);
        dispatch({ type: "SET", payload: data });
      } catch (error) {}
    };
    getProduct();
  }, []);

  return (
    <>
      <Heading>Products</Heading>
      <P>Order it for yourself or for your beloved ones</P>

      <Grid cols={2} $gap={35}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onClick={() => setShowingProduct(p)}
          />
        ))}
      </Grid>

      {showingProduct && (
        <ProductModal
          product={showingProduct}
          onClose={() => setShowingProduct(null)}
        />
      )}
    </>
  );
};
