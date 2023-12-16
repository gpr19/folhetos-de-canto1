const border = {
  radius: '0.4rem',
  profile: '2rem',
}

const boxLight = {
  shadow: '0 0px 8px rgba(0, 0, 0, 0.2)',
}

const boxDark = {
  shadow: '0 0px 8px rgba(255, 255, 255,0.2)',
}

const font = {
  family:
    'system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Noto Sans,Liberation Sans,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
  light: 300,
  normal: 400,
  bold: 600,
  sizes: {
    xxsmall: '1.0rem',
    xsmall: '1.2rem',
    small: '1.4rem',
    medium: '1.6rem',
    large: '1.8rem',
    xlarge: '2.0rem',
    xxlarge: '2.8rem',
    huge: '5.2rem',
  },
}

const colorsLight = {
  white: '#ffffff',
  white_100: '#f3f3f3',
  white_200: '#e4defc',
  black: '#0D0D0D',
  gray_50: '#f0efeb',
  gray_300: '#353B40',
  yellow_300: '#F1C40F',
  purple_100: '#7F57DF',
  purple_200: '#5f28e0',
  purple_300: '#5855E9',
  red_300: '#FF6666',
  blue: '#1467ff',
  active: '#cfe2ff',
  bs_body_bg: '#fff',
  bs_body_color: '#212529',
  bs_border_color: '#dee2e6',
  bs_tertiary_bg: '#f8f9fa',
}

const colorsDark = {
  white: '#161618',
  white_100: '#232323',
  white_200: '#32275f',
  black: '#ecedee',
  gray_50: '#0f1014',
  gray_300: '#cac4bf',
  yellow_300: '#0e3bf0',
  purple_100: '#80a820',
  purple_200: '#a0d71f',
  purple_300: '#a7aa16',
  red_300: '#009999',
  blue: '#eb9800',
  active: '#031633',
  bs_body_bg: '#212529',
  bs_body_color: '#adb5bd',
  bs_border_color: '#495057',
  bs_tertiary_bg: '#2b3035',
}

const imagesLight = {
  accordion_btn: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
  accordion_btn_active: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23052c65'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
}

const imagesDark = {
  accordion_btn: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%236ea8fe'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
  accordion_btn_active: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%236ea8fe'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
}

export const lightTheme = {
  border,
  box: boxLight,
  font,
  colors: colorsLight,
  images: imagesLight,
}

export const darkTheme = {
  border,
  box: boxDark,
  font,
  colors: colorsDark,
  images: imagesDark,
}

export const breakpoint = '1024px'
