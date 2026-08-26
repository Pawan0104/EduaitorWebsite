import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContactPopup } from "../Components/ContactPopup";

/** Legacy /bookademo URL — opens the shared contact popup, then returns home. */
const BookDemoPage = () => {
  const { openContactPopup } = useContactPopup();
  const navigate = useNavigate();

  useEffect(() => {
    openContactPopup("bookademo-route");
    navigate("/", { replace: true });
  }, [openContactPopup, navigate]);

  return null;
};

export default BookDemoPage;
