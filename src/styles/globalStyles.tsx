'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard-Light';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Light.woff') format('woff');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard-Medium';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff') format('woff');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard-SemiBold';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff') format('woff');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard-Bold';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
        font-weight: 700;
        font-style: normal;
    }

    :root {
        --max-width: 100%;
        --min-width: 320px;
        font-size: 16px;
    }

  * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
        min-height: 100vh;
        width: 100%;
        overflow: hidden; /* ✅ body에 스크롤 생기지 않게 설정 */
    }

    body {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
        /* 기본 폰트 굵기: 400 */
        font-family: 'Pretendard-Regular';      
    }

    main {
    width: 100%; 
    min-width: var(--min-width);
    min-height: 100vh;
    background-color: white;
    overflow-x: hidden;
    position: relative;
    margin: 0 auto;
}

    /* 모바일  */
    @media (max-width: 320px) {
        body, main {
            min-width: 320px;
        }
    }

    /* 웹 */
    @media (min-width: 431px) {
        :root {
            font-size: 18px;
        }
        main {
            width: 430px;
        }
    }

    @media (min-width: 768px) {
        :root {
            font-size: 20px;
        }
        main {
            width: 480px;
        }
    }


    .container {
        padding: 0 var(--horizontal-padding);
    }

`;

export const DatePickerSizeOverride = createGlobalStyle`
    .react-datepicker {
        font-size: 1.1rem;
    }

    .react-datepicker-popper {
        transform: translate(2rem, -26rem) !important;
        left: 0 !important;
        top: auto !important;
        z-index: 9999 !important;
        position: absolute;
    }


    .react-datepicker__month-container {
        width: 20rem; /* ✅ 같이 넓히기 */
    }

    .react-datepicker__header {
        padding-top: 2rem;
    }

    .react-datepicker__current-month {
        font-size: 1.3rem;
        font-weight: 600;
    }

    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__portal .react-datepicker__day-name,
    .react-datepicker__portal .react-datepicker__day {
        width: 2.8rem !important;
        line-height: 2.8rem !important;
        box-sizing: border-box;
        margin: 0;
        text-align: center;
    }
`;

export default GlobalStyle;
