import React from "react";
import styled from "styled-components";

interface Props {
  centered?: string;
  handleModal?: () => any;
  setIsEditing?: (value: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  name?: string;
  onClick?: () => any;
}

const FormModal = (props: Props) => {
  return (
    <StyledFormModal centered={props.centered}>
      <div className="form-section">
        <div className="topwrapper">
          <div>
            <p className="formTitle form-font">{props.title}</p>
            <p className="forName">{props.name}</p>
          </div>

          <img
            src="/images/closeOne.png"
            alt="close icon"
            onClick={props.onClick}
            className="closeIcon"
          />
        </div>

        {props.children}
      </div>
    </StyledFormModal>
  );
};

const StyledFormModal = styled.div<Props>`
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease all;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .form-section {
    width: 40%;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    animation: ${({ centered }) => (centered ? "none" : "appear .5s ease")};
    @keyframes appear {
      0% {
        opacity: 0;
        transform: translateX(-100px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
  @media only screen and (max-width: 1200px) {
    background: rgba(33, 51, 79, 0.44);
    .grey-background {
      display: none;
    }
    .form-section {
      max-width: 100%;
    }
  }
  @media only screen and (max-width: 505px) {
    .form-section {
      margin: 0 auto;
      width: 100vw;
    }
  }
  .topwrapper {
    display: flex;
    justify-content: space-between;
  }

  .formTitle {
    font-size: 18px;
    line-height: 3rem;
    color: #2254d3;
    font-family: "Sofia Pro";
  }
  .closeIcon {
    width: 1.8rem;
    height: 1.8;
    cursor: pointer;
    /* padding-right: 0.5rem; */
  }
  .forName {
    color: #8e919c;
  }
`;
export default FormModal;
