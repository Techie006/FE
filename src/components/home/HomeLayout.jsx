import CreateIngredient from './CreateIngredient';
import HomeIngredients from './HomeIngredients';
import RecommendRecipes from './RecommendRecipes';
import Ingredients from '../statistics/Ingredients';
import styled from "styled-components";
import TodayRecipe from './TodayRecipe';


const HomeLayout = () => {

    return (
        <StWrapper>
            <StContainer>
            <CreateIngredient/>
            <HomeIngredients/>
            </StContainer>
            <StContainer>
            <RecommendRecipes/>
            </StContainer>
            <div className='wrapper'>
            <StContainer>
            <div className='wrapper'>
            <StChartWrapper>
            <div className='chart_title'>우리집 냉장고 상태</div>
            <div className='chart_subTitle'>우리집 냉장고 현황</div>
            <Ingredients styled={{
                width : "221px",
                height : "221px"
            }}/>
            </StChartWrapper>
            
            <TodayRecipe/>
            </div>
            </StContainer>
            </div>
    </StWrapper>
        );
    };
    

export default HomeLayout;

const StWrapper = styled.div`
    display: flex;
    flex-direction : row;
    margin-top : 28px;
    padding : 0px 85px 0px 85px;
`
const StContainer = styled.div`
    margin-right : 28px;
`
const StChartWrapper = styled.div`
    display : flex; 
    flex-direction : column;
    padding : 20px;
    width : 405px;
    height : 387px;
    background-color : ${(props) => props.theme.colors.background.white};
    box-shadow : ${(props) => props.theme.section.layout.boxShadow};
    border-radius : ${(props) => props.theme.section.layout.borderRadius};
    margin-bottom : 29px;
    .chart_title {
        font-family: 'Happiness Sans';
        margin-bottom : 32px;
        font-weight : 900;
        font-size : 18px;
        line-height: 22px;
        color : ${(props) => props.theme.colors.font.gray2};
    }
    .chart_subTitle {
        margin-bottom : 12px;
        text-align : center;
        font-weight : 500;
        font-size : 12px;
        line-height: 17px;
        color : ${(props) => props.theme.colors.font.gray4};
    }
`