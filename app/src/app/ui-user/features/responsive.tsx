import { css } from "styled-components";

export const mobile = (props: any) => {
  return css`
    @media only screen and (max-width: 400px) {
      ${props}
    }
  `;
};

export const small = (props: any) => {
  return css`
    @media only screen and (max-width: 300px) {
      ${props}
    }
  `;
};

export const medium = (props: any) => {
  return css`
    @media only screen and (min-width: 500px) {
      ${props}
    }
  `;
};

export const large = (props: any) => {
  return css`
    @media only screen and (min-width: 700px) {
      ${props}
    }
  `;
};
