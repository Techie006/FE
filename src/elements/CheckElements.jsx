import styled from "styled-components";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import SmallLink from "./links/SmallLink";
import MediumLink from "./links/MediumLink";
import MediumLinkWithHelper from "./links/MediumLinkWithHelper";
import SmallLinkWithHelper from "./links/SmallLinkWithHelper";

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

import LargeButton from "./buttons/LargeButton";
import MediumButton from "./buttons/MediumButton";
import SmallButton from "./buttons/SmallButton";
import ModalSmallButton from "./buttons/ModalSmallButton";
import SmallIconButton from "./buttons/SmallIconButton";
import LargeIconButton from "./buttons/LargeIconButton";

const CheckElements = (props) => {
  const clickHandler = (e) => {
    console.log("clicked!");
  };

  return (
    <>
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
        3. Button
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

const StyledCompare = styled.div`
  width: 50px;
  display: flex;
  justify-content: space-evenly;
`;
