import React, { useState, useEffect } from "react";
import { Input, Row, Col } from "antd";

const Search = Input.Search;

const FilterTable = ({ onSearch, ...props }) => {
  return (
    <div className="filter" {...props}>
      <Search
        placeholder="Search Code"
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default FilterTable;
