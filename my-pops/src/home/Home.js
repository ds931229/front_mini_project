import React from 'react';
import axios from "axios";
import Movie from "../css/Movie";
import "./Home.css";

class Home extends React.Component{
  state = {
    isLoading: true,
    movies: [],
    value: ""
  };
  
  getMovies = async() => {
    const ID_KEY = "IGOAWQRjo2NGXmhqb4Gb";
    const SECRET_KEY = "S_rDpNK1Pc";
    const search = this.state.value;

    try {
      if (search === "") {
        this.setState({ movies: [], isLoading: false });
      } else {
        const {
          data: { items }
        } = await axios.get(
            '/v1/search/movie.json' ,{
              // 'https://20161490.github.io/data/movi.json' ,{
            params:{
              query: search,
              display: 10
            },
            headers: {
              'X-Naver-Client-Id': ID_KEY,
              'X-Naver-Client-Secret': SECRET_KEY
            }
        });
  
        this.setState({ movies: items, isLoading: false });
      } 
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getMovies();
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.getMovies();
  };


  render() {
    const { isLoading, movies } = this.state;
    return (
        <section className="container">
            {isLoading ? (
              <div className="loader">
                <span className="loader_text">Loading...</span>
              </div>
            ) : (<form onSubmit={this.handleSubmit}>
              <div className="input_div">
                <h1>영화 검색</h1>
                <input
                  className="input_search"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder="영화를 검색해 보세요."/>
              </div>
              <div className="movies">
                {movies.map(movie => (
                  <Movie
                    id={movie.link}
                    title={movie.title}
                    poster={movie.image}
                    actors={movie.actor}
                    year={movie.pubDate}
                  />
                ))}
              </div>
            </form>)}
        </section>
    );
  }
}

export default Home;
