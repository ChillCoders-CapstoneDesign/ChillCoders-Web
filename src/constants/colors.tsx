// src/constants/colors.ts

export const COLORS = {
    // palette
    white: '#FFF',
    main: '#3EB489',             // Main color
    gradientStart: '#39E0A3',    // Gradient Start
    gradientEnd: '#EAFFF9',      // Gradient End
    delete: '#EA6E6E',           // Delete color
    notice: '#E00209',           // Notice circle
    recruitSwitch: '#DADADA',    // Recruit switch color
    black: '#000000',            // Black

    // text
    mediumGrey: '#747474',       // 일반 텍스트 (mediumGrey)
    serviceName: '#5E5E5E',      // Service Name
    serviceCount: '#444444',     // Service Count
    topBarText: '#3D3D3D',       // Top Bar Text
};

// 파생 목적별 색상 그룹
export const BACKGROUND_COLORS = {
    default: COLORS.gradientEnd,
    delete: COLORS.delete,
    notice: COLORS.notice,
    switch: COLORS.recruitSwitch,
    black: COLORS.black,
};

export const TEXT_COLORS = {
    default: COLORS.mediumGrey,
    serviceName: COLORS.serviceName,
    serviceCount: COLORS.serviceCount,
    topBar: COLORS.topBarText,
    black: COLORS.black,
};

export const GRADIENT_COLORS = {
    start: COLORS.gradientStart,
    end: COLORS.gradientEnd,
};

export const BUTTON_COLORS = {
    primary: COLORS.main,
    delete: COLORS.delete,
};