//necessary imports are made

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../reduxactions/posts';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import useStyles from './styles';
//pagination component
const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
      if (page) {
        dispatch(getPosts(page));
      }
    }, [dispatch, page]);



    return (
        <Pagination
            classes={{ ul: classes.ul }} 
            count={numberOfPages} //number of pages
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />

         )}
        />
    );
};

export default Paginate;