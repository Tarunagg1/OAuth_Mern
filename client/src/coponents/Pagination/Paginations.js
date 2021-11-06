import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyles from './style';
import { getPost } from '../../action/post.action';

export default function Paginations({page}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {numberOfPage,currentPage} = useSelector(state => state.posts);


    useEffect(() => {
        if(page) {
            console.log(page);
            dispatch(getPost(page))
        }
    }, [page])

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPage}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}
