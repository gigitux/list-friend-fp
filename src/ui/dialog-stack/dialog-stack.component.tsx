import { css } from "@emotion/css";
import { FC, ReactChild, useRef } from "react";
import { createPortal } from "react-dom";
import { isNotNil } from "../../types/nullable.guards";

const Portal = ({ children }: { readonly children: ReactChild }) => {
  const dialogElement = document.getElementById("dialogs");
  return createPortal(
    children,
    isNotNil(dialogElement) ? dialogElement : document.body
  );
};

export type DialogStackComponentProps = {
  readonly children: readonly ReactChild[];
  readonly focusedDialog: number;
  readonly index?: number;
  readonly open?: boolean;
};

export const DialogStackComponent: FC<DialogStackComponentProps> = ({
  index,
  open,
  children,
  focusedDialog,
  ...props
}) => {
  const overlayEl = useRef<HTMLDivElement>(null);

  const getCoordinate = (index: number) => `${index * 20}px`;

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
            height: 300px;
            position: relative;
            width: 600px;
          `}
        >
          {children.map((children, index) => (
            <div
              key={index}
              tabIndex={-1}
              data-index={index}
              className={css`
                width: 480px;
                max-width: 100%;
                background-color: white;
                border-radius: 8px;
                position: absolute;
                top: ${getCoordinate(index)};
                left: ${getCoordinate(index)};
                z-index: ${focusedDialog === index ? 99999 : 0};
              `}
            >
              {children}
            </div>
          ))}
        </div>
      </div>
    </Portal>
  );
};
