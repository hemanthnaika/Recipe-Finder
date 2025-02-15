import { useState } from "react";

const Card = (recipe) => {
  recipe = recipe.recipe;
  const [showModal, setShowModal] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipeInstructions = async () => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?apiKey=${apiKey}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setInstructions(data[0].steps);
      } else {
        setInstructions([]);
      }
    } catch (error) {
      console.error("Error fetching recipe instructions:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs">
      {/* Recipe Image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-52 object-cover"
      />

      {/* Recipe Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{recipe.title}</h2>

        {/* Ingredients */}
        <p className="text-sm text-gray-600 mt-2">
          <strong>Used Ingredients:</strong> {recipe.usedIngredientCount} |
          <strong> Missed Ingredients:</strong> {recipe.missedIngredientCount}
        </p>

       
        <div className="grid grid-cols-5 mt-3">
          {recipe.missedIngredients.map((ingredient, index) => (
            <div key={index} className="relative group">
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="w-10 h-10 rounded-full border"
              />
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {ingredient.name}
              </span>
            </div>
          ))}
        </div>

        {/* Likes & Button */}
        <div className="flex justify-between items-center mt-4">
        
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
            onClick={() => {
              setShowModal(true);
              fetchRecipeInstructions();
            }}
          >
            View Recipe
          </button>
        </div>
      </div>

      {/* Modal for Recipe Details */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold">{recipe.title}</h2>
            <p className="mt-2 text-sm text-gray-600">
              <strong>How to Make:</strong>
            </p>

            {loading ? (
              <p className="text-gray-500">Loading instructions...</p>
            ) : instructions.length > 0 ? (
              <ol className="list-decimal list-inside text-sm mt-2">
                {instructions.map((step, index) => (
                  <li key={index} className="mt-1">
                    {step.step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500">No instructions available.</p>
            )}

            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
