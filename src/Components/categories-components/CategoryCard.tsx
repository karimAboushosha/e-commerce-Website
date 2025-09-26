import React from "react";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface CategoryCardProps {
  category: Category; 
  onClick?: (id: string) => void; 
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div
      className="p-4 border rounded-lg shadow cursor-pointer hover:shadow-lg transition"
      onClick={() => onClick?.(category._id)}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="mt-2 text-center font-semibold">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
