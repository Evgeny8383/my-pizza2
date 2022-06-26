import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';



function App() {

  const [pizzas,setPizzas] = React.useState([]);

  React.useEffect(()=>{
    fetch('https://62b6e9ad6999cce2e80a0768.mockapi.io/pizzas')
    .then((res) => res.json())
    .then((arr)=>{
    setPizzas(arr)
   })
  },[])

  
  return (
    <div className="App">
           <div className="wrapper">
        <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzas.map((obj)=>(
                <PizzaBlock
                 {...obj}
                key={obj.id } />
              ))
            }
             
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
