import styled from 'styled-components';
import { useHomeStore } from '../../../../store/useHomeStore';

const categories = ['전체보기', '음악', 'OTT', '툴', 'AI', '클라우드'];

const Category = () => {
    const { selectedCategory, setSelectedCategory } = useHomeStore();

    return (
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
    );
};

export default Category;

const CategoryContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
`;

const CategoryItem = styled.button<{ $selected: boolean }>`
    background-color: ${({ $selected }) => ($selected ? '#000' : '#eee')};
    color: ${({ $selected }) => ($selected ? '#fff' : '#000')};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
`;
