import { useEffect, useMemo, useState } from "react";

export const useUserEditorWithDialogs = () => {
  const [dialogListState, setDialogListState] = useState<readonly string[]>([]);

  const [focusedDialog, setFocusedDialogState] = useState<number>(0);

  // eslint-disable-next-line functional/no-expression-statement
  useEffect(
    () => setFocusedDialogState(dialogListState.length),
    [dialogListState]
  );

  const handlers = useMemo(
    () => ({
      openNewDialog: (userId: string) =>
        setDialogListState([...dialogListState, userId]),
      closeDialog: (userId: string) =>
        setDialogListState(dialogListState.filter((id) => id !== userId)),

      setFocusedDialog: setFocusedDialogState,
    }),

    [dialogListState]
  );

  return {
    dialogListState,
    focusedDialog,
    closeDialog: handlers.closeDialog,
    openNewDialog: handlers.openNewDialog,
    setFocusedDialogState: handlers.setFocusedDialog,
  };
};
