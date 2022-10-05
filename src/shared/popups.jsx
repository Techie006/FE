import Swal from "sweetalert2";

// 알랏창 띄우는 함수
export const showAlert = (timer, icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "center-center",
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon: icon,
    title: title,
  });
};

// 컨펌창 띄우는 함수
export const showConfirm = (
  title,
  icon,
  showCancelButton = false,
  cancelButtonText,
  confirmButtonText
) => {
  return Swal.fire({
    title: title,
    text: "",
    icon: icon,
    showCancelButton: showCancelButton,
    cancelButtonText: cancelButtonText,
    confirmButtonText: confirmButtonText,
    cancelButtonColor: "#FC9700",
    confirmButtonColor: "#74BDB2",
  });
};
