import { css } from "@emotion/css";
import { FC } from "react";

type HeaderComponentProps = {
  readonly headerText: string;
  readonly buttonText: string;
  readonly isButtonDisabled: boolean;
  readonly onClickOnButton: () => void;
};

export const HeaderComponent: FC<HeaderComponentProps> = ({
  headerText,
  buttonText,
  isButtonDisabled,
  onClickOnButton,
}) => {
  return (
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        width: 90%;
        align-items: center;
      `}
    >
      <h1>{headerText}</h1>
      <button disabled={isButtonDisabled} onClick={onClickOnButton}>
        {buttonText}
      </button>
    </div>
  );
};
