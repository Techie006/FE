import React from 'react';
import CreateIngredient from './CreateIngredient';
import HomeIngredients from './HomeIngredients';

const HomeLayout = () => {
    return (
        <>
            <CreateIngredient/>
            <HomeIngredients/>
        </>
    );
};

export default HomeLayout;