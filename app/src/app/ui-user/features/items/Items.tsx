import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { useAppSelector } from "../../../common/hooks";
import { ItemCard } from "../../components/ItemCard";
import { FilterItems } from "./components/FilterItems";
import { IItemData, itemsAsync, SearchType } from "./itemsSlice";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  box-shadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset";
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;
export const Items = () => {
  const { categoryId, searchTerm } = useParams();

  const dispatch = useDispatch();

  const items = useAppSelector((state) => state.items.items);

  useEffect(() => {
    if (categoryId !== undefined) {
      dispatch(itemsAsync({ type: SearchType.CATEGORY, value: categoryId }));
    } else if (searchTerm !== undefined) {
      dispatch(
        itemsAsync({ type: SearchType.SEARCH_TERM, value: searchTerm! })
      );
    } else {
      dispatch(itemsAsync({ type: SearchType.SEARCH_TERM, value: undefined }));
    }
  }, [dispatch]);
  return (
    <Wrapper>
      <FilterItems />
      <Container>
        {items.map((item: IItemData) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Container>
    </Wrapper>
  );
};
