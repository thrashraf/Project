import { useState } from "react";

const useModal = () => {
  const [isEditMode, setEditMode] = useState(false);

  function toggle() {
    setEditMode(!isEditMode);
  }

  return {
    isEditMode,
    toggle
  };
};

export default useModal;
