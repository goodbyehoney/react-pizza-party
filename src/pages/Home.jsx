    import React from 'react'
    import qs from 'qs';
    
    import { useSelector, useDispatch } from 'react-redux';
    import { selectFilter, setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
    import { useNavigate } from 'react-router-dom';
    import { fetchPizzas } from '../redux/slices/pizzaSlice';
    import { selectPizzaData } from '../redux/slices/pizzaSlice';

    import Categories from '../components/Categories';
    import Sort, { list } from '../components/Sort';
    import PizzaBlock from '../components/PizzaBlock';
    import Skeleton from '../components/PizzaBlock/Skeleton'
    import Pagination from '../components/Pagination';
    

    const Home = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const isSearch = React.useRef(false);
        const isMounted = React.useRef(false);

        const {items, status} = useSelector(selectPizzaData);
        const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);

        const onClickCategory = (id) => {
            dispatch(setCategoryId(id));
        };

        const onChangePage = (page) => {
            dispatch(setCurrentPage(page));
        };

        const getPizzas = async ()  => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        
        dispatch(
            fetchPizzas({
                        order,
                        sortBy,
                        category,
                        search,
                        currentPage,
                    })
                    );
                };

        React.useEffect(() => {
            if (window.location.search) {
                const params = qs.parse(window.location.search.substring(1));
                const sort = list.find(obj => obj.sortProperty === params.sortProperty);

                dispatch(
                    setFilters({
                        ...params,
                        sort,
                    }),
                );
                isSearch.current = true;
            }
        }, []);

        React.useEffect(() => {
            if (!isSearch.current) {
                getPizzas();
            }
            isSearch.current = false;
        }, [categoryId, sort.sortProperty, searchValue, currentPage]);


        React.useEffect(() => {
                if (isMounted.current) {
                    const queryString = qs.stringify({
                        sortProperty: sort.sortProperty,
                        categoryId,
                        currentPage,
                    });
                    navigate(`?${queryString}`);
                }
                isMounted.current = true;
            }, [categoryId, sort.sortProperty, searchValue, currentPage]);
            const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            const skeletons = [... new Array(6)].map((_, index)=> <Skeleton key={index} />)
        return (
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={onClickCategory}/>
                    <Sort value={sort}/>
                </div>
                <h2 className="content__title">Усі піцци</h2>
                {
                    status === 'error' ? (
                        <div className="content_error_info">
                        <h2> Ooops ... </h2>
                    </div> )
                    : (<div className="content__items"> {status === 'loading' ? skeletons : pizzas} </div>)
                }
                
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        );
    };

    export default Home;