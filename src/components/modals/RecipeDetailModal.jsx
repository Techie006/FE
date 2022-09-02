import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./modal.css";
import { RESP_WOO } from "../../server/response_woo";

function RecipeDetailModal({ open, modalState }) {
  const [recipeData, setRecipeData] = useState({});
  // const [recipeDesc, setRecipeDesc] = useState([])

  const getRecipe = async () => {
    // const resp = await axios.get(`https://localhost:3000/api/recipes?pageNum=${3}&pageLimit=${5}`)
    const resp = RESP_WOO.RECEPIE.GET_RECIPE_SUCCESS;
    const { recipe } = resp.content;
    setRecipeData(recipe);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const imgView = recipeData?.manual_imgs?.map((img) => (
    <img src={img} alt='img' />
  ));

  return (
    <div className={modalState ? "openModal modal" : "modal"}>
      {modalState ? (
        <section>
          <header>asd</header>
          <main>
            <div>{imgView}</div>
          </main>

          <footer>
            <button className='close' onClick={open}>
              요리완료
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}

export default RecipeDetailModal;
