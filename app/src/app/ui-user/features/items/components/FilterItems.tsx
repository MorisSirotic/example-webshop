import styled from "styled-components";
import { useAppDispatch } from "../../../../common/hooks";

import { mobile } from "../../responsive";
import { sortItemsCustom, SortType } from "../itemsSlice";

export const FilterItems = () => {
  const dispatch = useAppDispatch();

  const sortItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const type: SortType = SortType[e.target.value as keyof typeof SortType];
    const type: SortType = SortType[e.target.value as keyof typeof SortType];
    // dispatch(itemsSort(type));
    dispatch(sortItemsCustom(type));
  };

  return (
    <>
      <FilterContainer>
        {/* <Filter>
          <FilterColumn>
            <FilterText>Filter:</FilterText>
            <Select>
              <Option disabled selected>
                Color
              </Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Yellow</Option>
              <Option>Green</Option>
            </Select>
            <Select onChange={sortItems}>
              <Option disabled selected>
                Size
              </Option>
              <Option value={SortType.SIZE_XS}>XS</Option>
              <Option value={SortType.SIZE_S}>S</Option>
              <Option value={SortType.SIZE_M}>M</Option>
              <Option value={SortType.SIZE_L}>L</Option>
              <Option value={SortType.SIZE_ML}>ML</Option>
              <Option value={SortType.SIZE_XL}>XL</Option>
            </Select>
          </FilterColumn>
        </Filter> */}

        <Filter>
          <FilterText>Filter:</FilterText>
          <Select onChange={sortItems}>
            <Option value={SortType.TITLE_ASC}>Name (asc)</Option>
            <Option value={SortType.TITLE_DESC}>Name (desc)</Option>
            <Option value={SortType.PRICE_ASC}>Price (asc)</Option>
            <Option value={SortType.PRICE_DESC}>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
    </>
  );
};

const Title = styled.h1`
  margin: 20px;
`;
const FilterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 32px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
