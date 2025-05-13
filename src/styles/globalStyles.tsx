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

export default GlobalStyle;
