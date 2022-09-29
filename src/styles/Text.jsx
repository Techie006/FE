import styled from "styled-components";

// 대타이틀 @Figma
// usage: 레시피, 북마크, 검색결과, 클래스 페이지
export const BT1 = styled.div`
  font-family: "Happiness Sans";
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 38px;
  color: #4b4b4b;
`;

// 모달 대타이틀/캘린더 날짜 대타이틀 @Figma
// usage: 캘린더(식단기록, 식단 수정), 홈(재료 추가하기, 계정 설정, 프로필 변경, 우리집 식재료),
// 레시피(상세 레시피), 클래스(클래스 열기)
export const BT2 = styled(BT1)`
  font-size: 24px;
  line-height: 32px;
`;

// 소타이틀(20) @Figma
// usage: 캘린더
export const ST1 = styled.div`
  font-family: "Happiness Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  color: #4b4b4b;
`;

// 소타이틀(18) @Figma
// usage: 홈
export const ST2 = styled(ST1)`
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
`;

// 소타이틀(16) @Figma
// usage: 통계
export const ST3 = styled(ST1)`
  font-size: 16px;
  line-height: 23px;
`;

// 모달 소타이틀 @Figma
// usage: 홈(재료 검색), 레시피( 레시피 검색)
export const ST4 = styled(ST1)`
  font-weight: 900;
  line-height: 25px;
`;

// 검색 결과 소타이틀 @Figma
// usage: 홈(재료 검색), 레시피( 레시피 검색)
export const ST5 = styled(ST1)`
  font-size: 28px;
  line-height: 35px;
  color: #a5a5a5;
`;

// 안내 유도 텍스트 (main 내용 없을 시) @Figma
// usage: 홈, 통계, 캘린더
export const T1 = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: #c0c0c0;
`;

// 안내 텍스트 @Figma
// usage: 홈(추천 레시피, 우리집 식재료 모달)
export const T2 = styled(T1)`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #a5a5a5;
`;

// usage: 캘린더 식단명
export const T3 = styled(T1)`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  background-color: inherit;
  color: #282828;
`;

// usage: 식단 시간
export const T4 = styled(T1)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #8e7b6d;
`;

// usage: 식단 정보
export const T5 = styled(T1)`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #8e7b6d;
`;

// usage : 식단 내 날짜
export const T6 = styled(T1)`
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #5b5b5b;
`;

// usage : 쿠킹 클래스 리스트 시청자수
export const T7 = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #ffffff;
`;

// usage : 모달 에러 메시지
export const ET1 = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #ff5c01;
`;

// 그 외 텍스트

export const H1 = styled.div``;

export const H2 = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 20px;
  background-color: inherit;
`;

export const Text = styled.div`
  font-size: 0.7rem;
`;

// TODO jangwoo
export const HelperText = styled(Text)`
  /* color: ${(props) => props.theme.helperTextColor}; */
`;

export const ErrorText = styled(Text)`
  /* color: ${(props) => props.theme.errorTextColor}; */
`;

export const ValidateText = styled(Text)`
  /* color: ${(props) => props.theme.successTextColor}; */
`;
