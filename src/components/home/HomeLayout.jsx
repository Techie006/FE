import CreateIngredient from './CreateIngredient';
import HomeIngredients from './HomeIngredients';
import RecommendRecipes from './RecommendRecipes';
import Ingredients from '../statistics/Ingredients';
import GridTemplate from "../../elements/templates/GridTemplate";
import styled from "styled-components";
import TodayRecipe from './TodayRecipe';


const HomeLayout = () => {

    return (
        <StWrapper>
            <GridTemplate>
                <StMainSection>
                    <CreateIngredient/>
                    <HomeIngredients/>
                </StMainSection>
                <StSubSection>
            <RecommendRecipes/>
            </StSubSection>
            <StCartSection>
            <StChartWrapper>
            {/* <div className='chart_title'>우리집 냉장고 상태</div>
            <div className='chart_subTitle'>우리집 냉장고 현황</div> */}
            <Ingredients/>
            </StChartWrapper>
            <TodayRecipe/>
            </StCartSection>
            </GridTemplate>
    </StWrapper>
        );
    };
    

export default HomeLayout;

const StWrapper = styled.div`
`
const StGrid = styled.div`
  background: ${(props) => props.theme.section.layout.background};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
`;

const StMainSection = styled(StGrid)`
  grid-column: 1 / span 4;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;

const StSubSection = styled(StGrid)`
  grid-column: 5 / span 4;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
const StCartSection = styled(StGrid)`
  grid-column: 9 / span 4;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
const StChartWrapper = styled.div`
    padding : 20px;
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