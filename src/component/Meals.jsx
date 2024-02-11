import React, { useEffect } from 'react';
// import { useFetchData } from '../hooks/useFetchData';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {};
const  Meals = ()=>{

// const {error,isLoading,data:loadedMeals,setData:setLoadedMeals} = useFetchData();

const {data:loadedMeals,isLoading,error} = useHttp("http://localhost:3000/meals",requestConfig,[]);

if(isLoading){
    return <p className='center'>Loading...</p>
}
if(error){

  return <Error title = "failed to fetch the meals" msg = {error}></Error>
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