import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';



export default function Home() {

    const [pizzas,setPizzas] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true)

     React.useEffect(()=>{
       fetch('https://62b6e9ad6999cce2e80a0768.mockapi.io/pizzas')
        .then((res) => res.json())
        .then((arr)=>{
        setPizzas(arr);
        setIsLoading(false)
   })
  },[])
    return(
        <>
        <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { isLoading ? [...new Array(6)].map((_,index)=><Skeleton key={index} />)
         : pizzas.map((obj)=>(
            <PizzaBlock
             {...obj}
            key={obj.id } />
          ))
        }
         
      </div> 
      </>
    )
}