import React from 'react';
import { NavLink } from 'react-router-dom';
import { PriceSlider } from './PriceSlider';
import { SubCategoriesFilter } from './SubCategoriesFilter';
import { AttributeFilters } from './AttributeFilters';


export const FilterBlocks = (props) => {
  const { filters, urlBase, location } = props;
  // Map over parent filter types index.e. Price, Attributes, Sub Categories
  if (!filters && filters.length < 1) return null;
  return (
    <div>
      <NavLink to={`/${urlBase}`}>Clear filters</NavLink>
      {Object.keys(filters).map((filterType) => {
        if (filterType === 'price') {
          return (
            <PriceSlider
              filter={filters[filterType]}
              key={filterType}
              location={location}
            />
          );
        }
        if (filterType === 'attributes') {
          return (
            <AttributeFilters
              filters={filters}
              filterType={filterType}
              urlBase={urlBase}
              location={location}
            />
          );
        }
        if (filterType === 'subcategories') {
          return (
            <SubCategoriesFilter
              subcategories={filters[filterType]}
              key={filterType}
              urlBase={urlBase}
              location={location}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
