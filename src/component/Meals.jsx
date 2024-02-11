import React, { useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import MealItem from './MealItem';

const  Meals = ()=>{

const {error,isLoading,data:loadedMeals,setData:setLoadedMeals} = useFetchData();


  return (
    <ul id='meals'>
     {
        loadedMeals.map((meal)=>{
            return <MealItem meal = {meal} key={meal.id}></MealItem>
        })
     }
    </ul>
  )
}

export default Meals