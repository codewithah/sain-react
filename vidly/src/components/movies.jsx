import React, {Component} from "react";
import {getMovies} from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import {paginage} from '../utils/paginate';
import {getGenres} from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash';

class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectedGenre: "",
        sortColumn: {path: 'title', order: 'asc'}
    }

    componentDidMount() {
        const genres = [{_id: "", name: 'All genres'}, ...getGenres()];
        this.setState({movies: getMovies(), genres})
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({movies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie);
        movies[index]['liked'] = !movies[index]['liked'];
        this.setState({movies});
    }

    handlePageChange = page => {
        this.setState({currentPage: page})
    }

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1})
    }


    handleSort = sortColumn => {
        this.setState({sortColumn})
    }


    getPageData = () => {

        const {movies: allMovies, pageSize, currentPage, selectedGenre, sortColumn} = this.state;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginage(sorted, currentPage, pageSize)

        return {totalCount: filtered.length, data: movies};

    }

    render() {
        const {length: count} = this.state.movies;

        const {pageSize, currentPage, sortColumn} = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>

        const {totalCount, data: movies} = this.getPageData();

        return (
            <React.Fragment>
                <p className="mt-3">Showing {totalCount} in the database</p>
                <div className="row">
                    <div className="col col-3">
                        <ListGroup
                            items={this.state.genres}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreSelect}/>
                    </div>
                    <div className="col col-9">
                        <MoviesTable
                            movies={movies}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onLike={this.handleLike}
                            onSort={this.handleSort}
                        />
                    </div>
                </div>
                <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    };
}

export default Movies;