import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const Search = (props) => {
  return (
    <div>
      <Searc>
        <div>
          <input
            type="text"
            value={props.search}
            onChange={e=>props.setSearch(e.target.value)}
            onKeyDown={props.handleKeyDown}
            placeholder="Gözleg..."
          />
        </div>
        <SearchIconn>
          <SearchIcon style={{ color: "#3570a2" }} />
        </SearchIconn>
      </Searc>
    </div>
  );
};

const Searc = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 380px;
    input {
      border: none;
      box-shadow: none;
      background-color: #fff;
      border-radius: 16px;
      color: rgba(0, 0, 0, 0.9);
      width: 318px;
      padding: 0 8px 0 40px;
      outline: none;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;
const SearchIconn = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 7px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s;
`;
export default Search;
