import { Input, Button } from "@mantine/core";
import { useState } from "react";
import styled from "styled-components";
import { IAddressData } from "../../address/addressSlice";
import { mobile } from "../../responsive";

const AccountWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 12vh;
width: 100%;
border: 1px solid green;
${mobile({ padding: "5px" })}
`;

const InputRow = styled.div`
display: flex;
flex-direction: column;
margin-top: 2vh;
`;

const InputTitle = styled.span`
font-size: 12px;
font-weight: bold;
`;

const Bottom = styled.div`
display: flex;
justify-content: space-around;
border: 1px solid red;
margin-top: 2vh;
min-width: 250px;
`;

export const AddNewShippingInformation = (props: {
    address: IAddressData | undefined;
    onEdit: Function;
    onFavorite: Function;
    onDelete: Function;
    onSave: Function;
    onClose: Function;
    onCancel: Function;
  }) => {
    const [active, setActive] = useState(true);
    const { address } = props;
    return (
      <AccountWrapper>
        <InputRow>
          <InputTitle>First Name</InputTitle>
          <Input title="Ad3" defaultValue={address?.firstName} />
        </InputRow>
  
        <InputRow>
          <InputTitle>Last Name</InputTitle>
          <Input disabled={active} defaultValue={address?.lastName} />
        </InputRow>
  
        <InputRow>
          <InputTitle>Address Line 1</InputTitle>
          <Input disabled={active} defaultValue={address?.addressLine1} />
        </InputRow>
  
        <InputRow>
          <InputTitle>Address Line 2</InputTitle>
          <Input disabled={active} defaultValue={address?.addressLine2} />
        </InputRow>
  
        <InputRow>
          <InputTitle>City</InputTitle>
          <Input disabled={active} defaultValue={address?.city} />
        </InputRow>
  
        <InputRow>
          <InputTitle>Postal Code</InputTitle>
          <Input disabled={active} defaultValue={address?.postalCode} />
        </InputRow>
  
        <InputRow>
          <InputTitle>State</InputTitle>
          <Input disabled={active} defaultValue={address?.state} />
        </InputRow>
  
        <InputRow>
          <InputTitle>Phone Number</InputTitle>
          <Input disabled={active} defaultValue={address?.phoneNumber} />
        </InputRow>
  
        <Bottom>
          <Button disabled={active} onClick={() => props.onCancel()}>
            Cancel
          </Button>
          <Button disabled={active} onClick={() => props.onSave()}>
            Save
          </Button>
  
          <Button disabled={active} onClick={() => props.onFavorite()}>
            Add
          </Button>
        </Bottom>
      </AccountWrapper>
    );
  };