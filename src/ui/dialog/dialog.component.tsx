import { css } from "@emotion/css";
import { FC, ReactChild, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { isNotNil } from "../../types/nullable.guards";

const Portal = ({ children }: { readonly children: ReactChild }) => {
  const dialogElement = document.getElementById("dialogs");
  return createPortal(
    children,
    isNotNil(dialogElement) ? dialogElement : document.body
  );
};

export type DialogComponentProps = {
  readonly children: ReactChild;
  readonly open?: boolean;
};

export const DialogComponent: FC<DialogComponentProps> = ({
  open,
  children,
  ...props
}) => {
  const overlayEl = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line functional/no-expression-statement
  useEffect(() => overlayEl.current?.focus());

  return (
    <Portal>
      <div
        className={css`
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        {...props}
        ref={overlayEl}
        aria-modal="true"
        tabIndex={-1}
      >
        <div
          className={css`
            width: 480px;
            max-width: 100%;
            background-color: white;
            border-radius: 8px;
            position: relative;
          `}
          // onClick={stopPropagation}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
