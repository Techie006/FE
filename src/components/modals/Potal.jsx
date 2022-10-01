import reactDom from 'react-dom';

const ModalPotal = ({children}) => {
    const el = document.getElementById("modal")
    return reactDom.createPortal(children,el);
};
// 모달 div를 가져와 children으로 넣어주는, poral역할을 할 potal.jsx

export default ModalPotal;