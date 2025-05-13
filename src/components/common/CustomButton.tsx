'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';

type CustomButtonProps = {
    color: string;
    route?: string;
    text: string;
    onClick?: () => void;
};

const CustomButton = ({ color, route, text, onClick }: CustomButtonProps) => {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) onClick();
        if (route) router.push(route);
    };

    return (
        <StyledButton btncolor={color} onClick={handleClick}>
            {text}
        </StyledButton>
    );
};

export default CustomButton;

type StyledButtonProps = {
    btncolor: string;
};

const StyledButton = styled(Button)<StyledButtonProps>`
    background-color: ${(props) => props.btncolor};
    width: 100%;
    height: 3.75rem;
    border-radius: 0.5rem;
    color: ${COLORS.white};
    font-size: 1rem;
    font-family: ${FONTS.PRETENDARD[700]};
    border: none;

    &:hover,
    &:focus {
        background-color: ${(props) => props.btncolor} !important;
        color: ${COLORS.white} !important;
        opacity: 0.7;
    }
`;