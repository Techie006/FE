import styled from "styled-components";

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

const CheckElements = (props) => {
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
    // <Layout>
    //   <Header />
    //   <HomeLayout />
    // </Layout>
  );
};

export default CheckElements;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
`;
