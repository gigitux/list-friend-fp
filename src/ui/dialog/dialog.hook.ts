import { useMemo, useState } from "react";

export const useDialog = () => {
  const [isOpenState, setIsOpenState] = useState(false);

  const handlers = useMemo(
    () => ({
      openDialog: () => setIsOpenState(true),
      closeDialog: () => setIsOpenState(false),
    }),
    []
  );

  return {
    isOpenState,
    openDialog: handlers.openDialog,
    closeDialog: handlers.closeDialog,
  };
};
