import styled from 'styled-components';
import { useHomeStore } from '../../../../store/useHomeStore';
import { TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';

const categories = ['전체보기', '음악', 'OTT', '툴', 'AI', '클라우드', '기타'];

const Category = () => {
    const { selectedCategory, setSelectedCategory } = useHomeStore();

    return (
        <Wrapper>
            <CategoryContainer>
                {categories.map((category) => (
                    <CategoryItem
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        $selected={selectedCategory === category}
                    >
                        {category}
                    </CategoryItem>
                ))}
            </CategoryContainer>
        </Wrapper>
    );
};

export default Category;


const Wrapper = styled.div`
    overflow-x: auto;
    border-bottom: 1px solid #ddd;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    width: 100%;
`;

const CategoryContainer = styled.div`
    display: flex;
    width: max-content;
`;

const CategoryItem = styled.button<{ $selected: boolean }>`
    flex: 0 0 5rem;
    background-color: white;
    border: none;
    padding-bottom: 0.75rem;
    padding-top: 1rem;
    cursor: pointer;
    text-align: center;
    font-size: 1rem;
    color: ${({ $selected }) =>
        $selected ? TEXT_COLORS.black : TEXT_COLORS.default};
    font-family: ${FONTS.PRETENDARD[700]};
    border-bottom: ${({ $selected }) =>
        $selected ? '0.25rem solid black' : '0.25rem solid transparent'};
`;