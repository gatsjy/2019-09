/**
 * toasType: contants에 있는 toast 타입,
 * message: toast에 보여줄 메시지,
 * open: global state의 toast open,
 * dispatch: global dispatch
 * @param {*} param0
 */
const useToast = ({ open, dispatch, actions }) => {
  const openToastTimeoutHandler = (toastType, message) => {
    dispatch(actions.openToast(toastType, message));
  };
  const openToast = (toastType, message) => {
    if (open) {
      dispatch(actions.closeToast());
    }
    setTimeout(openToastTimeoutHandler.bind(null, toastType, message), 0);
  };
  const closeToast = () => {
    dispatch(actions.closeToast());
  };
  return { openToast, closeToast };
};

export default useToast;
