import React from 'react'
import styled from 'styled-components';
import {selectMovies} from '../features/movie/movieSlicer';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

function Movies() {

    const movies = useSelector(selectMovies);

    return (
        <Container>
            <h4>Recommended For You</h4>
            <Content>
                {movies &&
                    movies.map((movie) => ( //loops through the movies from database
                        //Link goes to the detail pages of each id
                        <Wrap key={movie.id}>
                            <Link to={`/detail/${movie.id}`}> 
                                <img src={movie.cardImg} />
                            </Link>
                        </Wrap>
                    ))
                }
            </Content>
        </Container>
    )
}

export default Movies

const Container = styled.div`
    padding: 0 0 26px;  
`
const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr)); 
`
const Wrap = styled.div`
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    border: 3px solid rgba(249, 249, 249, 0.1);
    transition: all 250ms;

        img {
            width: 100%;
            object-fit: cover;
            height: 100%;    
        }

        &:hover{
            box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
            rgb(0 0 0 / 72%) 0px 30px 22px -10px;
            transform: scale(1.05);
            border-color: rgba(249, 249, 249, 0.8);
        }
`