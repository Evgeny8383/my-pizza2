import React from 'react';
import axios from 'axios';
import { useSelector,useDispatch} from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId,setCurrentPage } from '../redax/Slices/filterSlice';

export default function Home() {
     
     const dispatch = useDispatch(); 
     const {categoryId,sort,currentPage} = useSelector(state =>state.filter);
     const sortType = sort.sortProperty;
     const {searchValue} = React.useContext(SearchContext);

    const [pizzas,setPizzas] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);
    
    const onChangeCategory =(id)=>{
      dispatch(setCategoryId(id));
    };
    const onPageChange = page =>{
      dispatch(setCurrentPage(page))
    }
     
    
     React.useEffect(()=>{
      setIsLoading(true);
      const sortBy = sortType.replace('-','');
      const order = sortType.includes('-')?'asc':'desc';
      const category = categoryId > 0 ? `category=${categoryId}`:'';
      const search = searchValue ? `&search=${searchValue}`: '';

   axios.get(`https://62b6e9ad6999cce2e80a0768.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`)
       .then(res =>{
        setPizzas(res.data);
       setIsLoading(false)
       })

   window.scrollTo(0,0)
  },[categoryId,sortType,currentPage,searchValue]);

  
 
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
        <Sort  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { isLoading ? [...new Array(6)].map((_,index)=><Skeleton key={index} />)
        : items
        }
        </div> 
        <Pagination currentPage={currentPage} onPageChange={onPageChange} /> 
        
      </>
      
    )
    
}