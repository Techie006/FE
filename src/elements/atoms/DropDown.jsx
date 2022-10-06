import Dropdown from "rc-dropdown";
import Menu, { Item } from "rc-menu";

import "rc-dropdown/assets/index.css";
import "./rc-dropdown/style.css";

// TODO 드롭다운 문제점 해결: 같은 요소 선택 안됨
const DropDown = ({ onSelect, keys, contents, ...props }) => {
  // rc-menu로 드롭다운 생성
  const overlay = () => {
    const items = contents.map((content, idx) => (
      <Item key={keys[idx]}>{content}</Item>
    ));
    // props로 받은 onSelect 함수를 적용
    return <Menu onSelect={onSelect}>{items}</Menu>;
  };

  return (
    <Dropdown trigger={["click"]} overlay={overlay} animation='slide-up'>
      {props.children}
    </Dropdown>
  );
};

export default DropDown;
