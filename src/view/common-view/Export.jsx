import React from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import styled from "styled-components";

const Export = () => {
  return (
    <div>
      <ExportContainer>
        <div>
          <input type="text" disabled="disabled" value="wahaaaaaa" />
        </div>
        <ExportIcon>
          <IosShareIcon style={{ color: "#585858" }} />
        </ExportIcon>
      </ExportContainer>
    </div>
  );
};

const ExportContainer = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 80px;
    input {
      border: none;
      box-shadow: none;
      background-color: #fff;
      border-radius: 16px;
      color: #585858;
      width: 51px;
      padding: 0 8px 0 55px;
      line-height: 1.75;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;
const ExportIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 3px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s;
`;
export default Export;
