import { useEffect, useState } from "react";
import { bg } from "../assets/index";
import axios from "axios";
import Card from "../components/card";

const Home = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  // Function to auto-insert commas between words
  const formatIngredients = (input) => {
    return input
      .split(/\s+/) // Split by spaces
      .join(", "); // Join with commas
  };

  const fetchRecipes = async (e) => {
    if (e) e.preventDefault(); // Prevent form submission reload

    try {
      const formattedIngredients = formatIngredients(ingredients);
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedIngredients}&apiKey=${apiKey}&number=20`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <>
      <div
        className="relative w-full h-[65vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Find the Best Recipes🍽️</h1>
          <p className="mt-4 text-lg md:text-xl">
            Enter ingredients you have, and we'll find the perfect recipe for you!
          </p>

          {/* Search Bar */}
          <form className="mt-6 flex justify-center" onSubmit={fetchRecipes}>
            <input
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              type="text"
              placeholder="Enter ingredients (e.g., chicken, garlic, tomatoes)"
              className="w-full md:w-96 px-4 py-2 rounded-l-md text-black outline-none"
            />
            <button
              type="submit"
              className="bg-red-500 px-6 py-2 rounded-r-md hover:bg-red-600"
            >
              Search🔍
            </button>
          </form>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-black lg:px-20 py-10">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <Card recipe={recipe} key={recipe.id} />)
        ) : (
          <p className="mt-3 text-gray-500 text-center w-full col-span-4">
            No recipes found. Try different ingredients!
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
