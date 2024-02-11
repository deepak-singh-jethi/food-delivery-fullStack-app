import React, { useEffect } from 'react';
// import { useFetchData } from '../hooks/useFetchData';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';

const requestConfig = {};
const  Meals = ()=>{

// const {error,isLoading,data:loadedMeals,setData:setLoadedMeals} = useFetchData();

const {data:loadedMeals,isLoading,error} = useHttp("http://localhost:3000/meals",requestConfig,[]);

if(isLoading){
    return <p className='center'>Loading...</p>
}

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