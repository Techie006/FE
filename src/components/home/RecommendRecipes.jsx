import React from 'react';
import Recipes from "./Recipes"
import axios from 'axios';
import styled from "styled-components";

const RecommendRecipes = () => {
    
    const resp = await axios.post("http://3.36.56.125/api/user/signup",{
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