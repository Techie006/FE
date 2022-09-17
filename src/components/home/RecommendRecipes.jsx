import React from 'react';
import { useSelector } from 'react-redux';
import Recipes from "./Recipes"
import axios from 'axios';
import styled from "styled-components";

const RecommendRecipes = () => {

    const resp = await axios.get("http://3.36.56.125/api/recipes/recommend",{
        email : userId,
        username : watch("usename"),
        password : watch("password"),

    })
    return (
        <div>
            <Recipes/>
        </div>
    );
};

export default RecommendRecipes;