import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
   
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        --bs-pagination-font-size: 1.6rem;
    }

    ${({ theme }) => css`
      html {
        font-size: 62.5%;
      }
      body {
        font-size: ${theme.font.sizes.medium};
        background-color: ${theme.colors.white};
        color: ${theme.colors.black};
        transition: all 0.5s linear;

        --bs-body-bg: ${theme.colors.bs_body_bg};
        --bs-body-color: ${theme.colors.bs_body_color};
        --bs-border-color: ${theme.colors.bs_border_color};
        --bs-tertiary-bg: ${theme.colors.bs_tertiary_bg};
      }

      body,
      input,
      textarea,
      button,
      span,
      select {
        font-family: ${theme.font.family};
        font-size: 1.6rem !important;
      }
      .form-control::-webkit-input-placeholder {
        color: ${theme.colors.bs_body_color};
        opacity: 0.5;
      }
      .modal-backdrop {
        --bs-backdrop-zindex: 1055 !important;
      }
      .accordion-button {
        &::after {
          /* background-color: red; */
          /* color: red; */
        }

        --bs-accordion-btn-icon: ${theme.images.accordion_btn} !important;
        --bs-accordion-btn-active-icon: ${theme.images.accordion_btn_active} !important;

        --bs-accordion-color: ${theme.colors.black} !important;
        --bs-accordion-bg: ${theme.colors.white_100} !important;
        --bs-accordion-border-color: ${theme.colors.white_200} !important;
        --bs-accordion-active-bg: ${theme.colors.active} !important;
        --bs-accordion-active-color: ${theme.colors.black} !important;
      }
      .nav-link.active {
        color: ${theme.colors.white} !important;
        background-color: ${theme.colors.blue} !important;
      }
    `}

  

    button{
        cursor: pointer;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }
   
    .sub-category > * {
        background-color: var(--bs-body-bg) !important;
    }
    .content_edit{
        margin: 10px;
    }
    .btn_bold{
        border: 1px solid #ccc;
        border-radius: 10px;
    }
    .lyrics-wrapper {
        width: 100% !important;
        display: block !important;
        height: 400px !important;
        margin-bottom: -40px;
        /* background-color: red; */
    }
    .lyrics-editor{
        height: 200px !important;
        border: 1px solid #F1F1F1 !important;
        padding: 5px !important;
        height: 75% !important;
        border-radius: 2px !important;
        border-color: var(--bs-border-color) !important;
    }
    .public-DraftStyleDefault-block {
        margin: 0;
    }
    .rdw-option-wrapper{
        color: #000; 
        height: 30px !important;
        min-width: 30px !important;
        border: 1px solid #ccc !important;
        border-radius: 10px !important;
    }
    .rdw-option-active {
        background-color: #ccc;
        border: 2px solid black !important;
    }
    .rdw-editor-toolbar {
        background-color: var(--bs-tertiary-bg);
        border-color: var(--bs-border-color) !important;
    }
    .rdw-option-wrapper{
    height: 30px !important;
    min-width: 30px !important;
    border: 1px solid #ccc !important;
    border-radius: 10px !important;
    }
    .chord-option img{
        width: 22px;
    }
    
`
