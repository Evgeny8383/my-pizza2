import React from 'react';
import { useSelector,useDispatch} from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redax/Slices/filterSlice';

export default function Home() {
 
     const dispatch = useDispatch(); 
     const categoryId = useSelector(state =>state.filter.categoryId);
    
    const {searchValue} = React.useContext(SearchContext);

    const [pizzas,setPizzas] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);
    // const [categoryId,setCategoryId] = React.useState(0);
    const [currentPage,setCurrentPage] = React.useState(1);
    const [sortType,setSortType]=React.useState({
      name:'популярности',
      sortProperty:'reting'
    });
    const onChangeCategory =(id)=>{
      dispatch(setCategoryId(id));
    }

     React.useEffect(()=>{
      setIsLoading(true);
      const sortBy = sortType.sortProperty.replace('-','');
      const order = sortType.sortProperty.includes('-')?'asc':'desc';
      const category = categoryId > 0 ? `category=${categoryId}`:'';
       fetch(`https://62b6e9ad6999cce2e80a0768.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
       )
        .then((res) => res.json())
        .then((arr)=>{
        setPizzas(arr);
        setIsLoading(false)
   });
   window.scrollTo(0,0)
  },[categoryId,sortType,currentPage])
 
    const items = pizzas.filter(obj=>{
      if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
        return true
      }
      return false
    }).map((obj)=>
      <PizzaBlock
       {...obj}
      key={obj.id } />
    
    )
    return(
        <>
        <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort  value={sortType} onChangeSort={(i)=>setSortType(i)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { isLoading ? [...new Array(6)].map((_,index)=><Skeleton key={index} />)
        : items
        }
        </div> 
        <Pagination onPageChange= {(number)=>setCurrentPage(number)} /> 
      </>
    )
}