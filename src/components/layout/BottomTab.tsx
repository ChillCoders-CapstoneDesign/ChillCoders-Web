'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FONTS } from '@/constants/font';

// 이미지 임포트 (예시)
import homeOn from '@/assets/icons/bottomTab/home-on.png';
import homeOff from '@/assets/icons/bottomTab/home-off.png';
import courseOn from '@/assets/icons/bottomTab/course-on.png';
import courseOff from '@/assets/icons/bottomTab/course-off.png';
import mapOn from '@/assets/icons/bottomTab/map-on.png';
import mapOff from '@/assets/icons/bottomTab/map-off.png';
import mypageOn from '@/assets/icons/bottomTab/mypage-on.png';
import mypageOff from '@/assets/icons/bottomTab/mypage-off.png';
import searchOn from '@/assets/icons/bottomTab/search-on.png';
import searchOff from '@/assets/icons/bottomTab/search-off.png';

type Tab = {
    name: string;
    label: string;
    path: string;
    onIcon: string;
    offIcon: string;
};

const tabs: Tab[] = [
    { name: 'home', label: '홈', path: '/home', onIcon: homeOn.src, offIcon: homeOff.src },
    { name: 'course', label: '과정', path: '/course', onIcon: courseOn.src, offIcon: courseOff.src },
    { name: 'map', label: '지도', path: '/map', onIcon: mapOn.src, offIcon: mapOff.src },
    { name: 'mypage', label: '마이', path: '/mypage', onIcon: mypageOn.src, offIcon: mypageOff.src },
    { name: 'search', label: '검색', path: '/search', onIcon: searchOn.src, offIcon: searchOff.src },
];

type BottomTabProps = {
    currentPath: string;
};

const BottomTab = ({ currentPath }: BottomTabProps) => {
    return (
        <BottomTabContainer>
            <BottomTabWrapper>
                {tabs.map((tab) => {
                    const isActive = currentPath.startsWith(tab.path);
                    return (
                        <TabItem key={tab.name}>
                            <StyledLink href={tab.path} $isActive={isActive}>
                                <TabContent>
                                    <Image
                                        src={isActive ? tab.onIcon : tab.offIcon}
                                        alt={tab.label}
                                        width={24}
                                        height={24}
                                        style={{ width: '1.5rem', height: '1.5rem' }}
                                    />
                                    <TabLabel>{tab.label}</TabLabel>
                                </TabContent>
                            </StyledLink>
                        </TabItem>
                    );
                })}
            </BottomTabWrapper>
        </BottomTabContainer>
    );
};

export default BottomTab;

// styled-components 스타일들
const BottomTabContainer = styled.div``;
const BottomTabWrapper = styled.ul`
    display: flex;
    justify-content: space-around;
    padding: 1rem 0;
    background-color: white;
`;

const TabItem = styled.li``;

const StyledLink = styled(Link)<{ $isActive: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${({ $isActive }) => ($isActive ? '#000' : '#aaa')};
`;

const TabContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TabLabel = styled.span`
    margin-top: 0.25rem;
    font-size: 0.75rem;
    font-family: ${FONTS.PRETENDARD[400]};
`;