import styled from "styled-components";
import { faBookmark, faUser, faKey } from "@fortawesome/free-solid-svg-icons";

// links
import SmallLink from "./links/SmallLink";
import MediumLink from "./links/MediumLink";
import MediumLinkWithHelper from "./links/MediumLinkWithHelper";
import SmallLinkWithHelper from "./links/SmallLinkWithHelper";

// category
import UnderlineCategory from "./categories/UnderlineCategory";
import Textbox from "./textboxes/Textbox";

// texts
import {
  SectionTitle,
  AccentText,
  NormalText,
  SmallText,
  HelperText,
  ErrorText,
  ValidateText,
} from "./texts/pageTexts";
import {
  ModalTitle,
  ModalAccentText,
  ModalNormalText,
  ModalSmallText,
} from "./texts/modalTexts";

// inputs
import InputWithIcon from "./inputs/InputWithIcon";
import LargeInput from "./inputs/LargeInput";
import SmallInput from "./inputs/SmallInput";

// buttons
import LargeButton from "./buttons/LargeButton";
import MediumButton from "./buttons/MediumButton";
import SmallButton from "./buttons/SmallButton";
import ModalSmallButton from "./buttons/ModalSmallButton";
import SmallIconButton from "./buttons/SmallIconButton";
import LargeIconButton from "./buttons/LargeIconButton";

// textareas
import SmallTextarea from "./textareas/SmallTextarea";
import MediumTextarea from "./textareas/MediumTextarea";

// calendar
import MiniCalender from "./calendar/MiniCalendar";

// layouts
import RecipeLargeLayout from "./layouts/RecipeLargeLayout";
import RecipeMediumLayout from "./layouts/RecipeMediumLayout";
import RecipeSmallLayout from "./layouts/RecipeSmallLayout";

const CheckElements = (props) => {
  const clickHandler = (e) => {
    console.log("clicked!");
  };

  return (
    <>
      <StyledContainer>
        <StElement>A. UnderlineCategory</StElement>
        <UnderlineCategory
          contents={["category1", "category2", "category3", "category4"]}
          onClick={clickHandler}
          selectedCategory='category1'
        />
      </StyledContainer>
      <StyledContainer>
        <StElement>B. Textbox</StElement>
        <Textbox content={"you should put content here!"} />
      </StyledContainer>
      <hr />
      <StyledContainer>
        1. Links
        <MediumLink content='MediumLink' link='/elements' />
        <MediumLinkWithHelper
          helper='helper sentence like this and that.'
          content='MediumLinkWithHelper'
          link='/elements'
        />
        <SmallLink content='SmallLink' link='/elements' />
        <SmallLinkWithHelper
          helper='helper sentence with link: '
          content='SmallLinkWithHelper'
          link='/elements'
        />
      </StyledContainer>
      <StyledContainer>
        <StElement>2. Categories</StElement>
        <UnderlineCategory
          title='UnderlineCategory'
          contents={["category1", "category2", "category3", "category4"]}
          onClick={clickHandler}
          selectedCategory='category1'
        />
      </StyledContainer>
      <StyledContainer>
        3. Buttons
        <LargeButton
          type='button'
          content='LargeButton'
          onClick={clickHandler}
          disabled={false}
        />
        <MediumButton
          type='button'
          content='MediumButton'
          onClick={clickHandler}
          disabled={false}
        />
        <SmallButton
          type='button'
          content='SmallButton'
          onClick={clickHandler}
          disabled={false}
        />
        <ModalSmallButton
          type='button'
          content='ModalSmallButton'
          onClick={clickHandler}
          disabled={false}
        />
        <StyledCompare>
          <SmallIconButton icon={faBookmark} onClick={clickHandler} />
          <SmallIconButton
            icon={faBookmark}
            onClick={clickHandler}
            disabled={true}
          />
        </StyledCompare>
        <StyledCompare>
          <LargeIconButton icon={faBookmark} onClick={clickHandler} />
          <LargeIconButton
            icon={faBookmark}
            onClick={clickHandler}
            disabled={true}
          />
        </StyledCompare>
      </StyledContainer>
      <StyledContainer>
        <div>4. inputs</div>
        - InputWithIcon
        <InputWithIcon placeholder='placeholder' icon={faUser} />
        <InputWithIcon placeholder='placeholder' icon={faKey} />
        - LargeInput
        <LargeInput placeholder='placeholder' />
        - SmallInput
        <SmallInput placeholder='placeholder' />
      </StyledContainer>
      <StyledContainer>
        5. Textareas
        <MediumTextarea></MediumTextarea>
        <SmallTextarea></SmallTextarea>
      </StyledContainer>
      <StyledContainer>
        6. Texts
        <div>6-1. pageTexts</div>
        <SectionTitle>SectionTitle</SectionTitle>
        <AccentText>AccentText</AccentText>
        <NormalText>NormalText</NormalText>
        <SmallText>SmallText</SmallText>
        <HelperText>HelperText</HelperText>
        <ErrorText>ErrorText</ErrorText>
        <ValidateText>ValidateText</ValidateText>
        6-2. pageTexts
        <ModalTitle>ModalTitle</ModalTitle>
        <ModalAccentText>ModalAccentText</ModalAccentText>
        <ModalNormalText>ModalNormalText</ModalNormalText>
        <ModalSmallText>ModalSmallText</ModalSmallText>
      </StyledContainer>
      <StyledContainer>
        7. Calendar
        <MiniCalender></MiniCalender>
      </StyledContainer>
      <StyledContainer>
        9. Layout
        <RecipeLargeLayout>RecipeLargeLayout</RecipeLargeLayout>
        <RecipeMediumLayout>RecipeMediumLayout</RecipeMediumLayout>
        <RecipeSmallLayout>RecipeSmallLayout</RecipeSmallLayout>
      </StyledContainer>
    </>
  );
};

export default CheckElements;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const StElement = styled.div`
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSize};
  font-weight: ${(props) => props.theme.fontWeight};
`;

const StyledCompare = styled.div`
  width: 50px;
  display: flex;
  justify-content: space-evenly;
`;
