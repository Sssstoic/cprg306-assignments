"use client";
import { useUserAuth } from "../_utils/auth-context";

import React, { useEffect, useState } from 'react';

const MealIdeas = ({ ingredient }) => {
    const [meals, setMeals] = useState([]);
    const [mealDetails, setMealDetails] = useState({});
    const [expandedMealId, setExpandedMealId] = useState(null); 

    const fetchMealIdeas = async (ingredient) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals || [];
    };

    const fetchMealDetails = async (mealId) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        return data.meals[0];
    };

    const loadMealIdeas = async () => {
        if (ingredient) {
            const mealIdeas = await fetchMealIdeas(ingredient);
            setMeals(mealIdeas);
            const detailsPromises = mealIdeas.map(meal => fetchMealDetails(meal.idMeal));
            const details = await Promise.all(detailsPromises);
            const detailsMap = details.reduce((acc, meal) => {
                acc[meal.idMeal] = meal;
                return acc;
            }, {});
            setMealDetails(detailsMap);
        }
    };

    useEffect(() => {
        loadMealIdeas();
    }, [ingredient]);

    const toggleIngredients = (mealId) => {
        setExpandedMealId(prevId => (prevId === mealId ? null : mealId)); 
    };

    return (
        <div className="bg-white text-blue-500 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2 text-blue-500">Meal Ideas for {ingredient}</h2>
            <ul className="space-y-4">
                {meals.map(meal => (
                    <li key={meal.idMeal} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200">
                        <button onClick={() => toggleIngredients(meal.idMeal)} className="flex justify-between w-full">
                            {meal.strMeal}
                        </button>
                        {/* Show ingredients if the meal is expanded */}
                        {expandedMealId === meal.idMeal && mealDetails[meal.idMeal] && (
                            <ul className="mt-2 text-sm text-gray-200">
                                {Object.entries(mealDetails[meal.idMeal])
                                    .filter(([key, value]) => key.startsWith('strIngredient') && value) 
                                    .map(([key, value], index) => (
                                        <li key={index} className="flex justify-between">
                                            <span>{value}</span>
                                            <span>{mealDetails[meal.idMeal][`strMeasure${key.slice(-1)}`]}</span>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MealIdeas;
