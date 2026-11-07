import React from "react";

export default function Filters({
  search,
  category,
  sort,
  setSearch,
  setCategory,
  setSort,
}) {
  return (
    <div className="filters">
      <input
        className="filters__search"
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
      />
      <div className="select__container">
        <p>Select category:</p>
        <select
          className="filters__select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">All</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>
      <div className="select__container">
        <p>Sort by:</p>
        <select
          className="filters__select"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="cheap">Cheap</option>
          <option value="expensive">Expensive</option>
        </select>
      </div>
    </div>
  );
}
