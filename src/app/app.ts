import { Component } from '@angular/core'
import { CommonModule } from '@angular/common';

@Component({

  imports: [CommonModule],
  selector: 'app-root',
  standalone: true,
  template: `

  <h1>Movie Data Results</h1>


<h2>All Movie Titles</h2>
<ul>
  <li *ngFor="let title of titles">
    {{ title }}
  </li>
</ul>



<h2>Movies with Rating > 8.5</h2>
<ul>
  <li *ngFor="let movie of highRatedMovies">
    {{ movie.title }} - ⭐ {{ movie.rating }}
  </li>
</ul>



<h2>Movies Sorted by Rating</h2>
<ul>
  <li *ngFor="let movie of sortedByRating">
    {{ movie.title }} - ⭐ {{ movie.rating }}
  </li>
</ul>



<h2>Movies After 2000</h2>
<ul>
  <li *ngFor="let movie of after2000Sorted">
    {{ movie.title }} - 📅 {{ movie.year }}
  </li>
</ul>



<h2>Movies Sorted by Year</h2>
<ul>
  <li *ngFor="let movie of sortByYear">
    {{ movie.title }} - 📅 {{ movie.year }}
  </li>
</ul>



<h2>Title & Rating</h2>
<ul>
  <li *ngFor="let movie of titleRating">
    {{ movie.title }} - ⭐ {{ movie.rating }}
  </li>
</ul>



<h2>Christopher Nolan Movies (>8.5)</h2>
<ul>
  <li *ngFor="let movie of nolanMovies">
    {{ movie }}
  </li>
</ul>



<h2>Movies with Rating > 8.5 Sorted by Year</h2>
<ul>
  <li *ngFor="let movie of yearRating">
    {{ movie }}
  </li>
</ul>



<h2>Genre Counts</h2>
<ul>
  <li *ngFor="let genre of genreCount | keyvalue">
    {{ genre.key }} : {{ genre.value }}
  </li>
</ul>



<h2>Statistics</h2>

<p>All movies rating above 7: {{ allAbove7 }}</p>

<p>Average rating of all movies: {{ averageRating | number: '1.2-2' }}</p>

<p>Average rating Drama before 2000: {{ DramaMovies | number: '1.2-2'}}</p>

<p>genre highlights >{{ genreHighlights }}</p>

<p>Contains Sci-Fi movie: {{ SciFimovies }}</p>

<p>Contains Tarantino movie: {{ TarantinoMovies }}</p>

<p>All movies released after 1990: {{ moviesReleased }}</p>

<p>Has movie rating above 9: {{ hasAboveNine }}</p>

<p>All Nolan movies rating above 8.5: {{ allAboveEight }}</p>

`,

})

export class App {

   movies = [
    {"title": "Inception", "year": 2010, "rating": 8.8, "genre": ["Action", "Sci-Fi"], "director": "Christopher Nolan"},
    {"title": "The Dark Knight", "year": 2008, "rating": 9.0, "genre": ["Action", "Crime", "Drama"], "director": "Christopher Nolan"},
    {"title": "Pulp Fiction", "year": 1994, "rating": 8.9, "genre": ["Crime", "Drama"], "director": "Quentin Tarantino"},
    {"title": "The Matrix", "year": 1999, "rating": 8.7, "genre": ["Action", "Sci-Fi"], "director": "Lana Wachowski, Lilly Wachowski"},
    {"title": "Fight Club", "year": 1999, "rating": 8.8, "genre": ["Drama"], "director": "David Fincher"}

      
  ];
  
    titles = this.movies.map(movie => movie.title);
    
    highRatedMovies = this.movies.filter(movie => movie.rating > 8.5)
    
    sortedByRating = [...this.movies].sort((a, b) => b.rating - a.rating);
   
    after2000Sorted = this.movies.filter(movie => movie.year > 2000)
    
    sortByYear = [...this.movies].sort((a,b) => a.year - b.year);
   
    allAbove7 = this.movies.every(movie => movie.rating > 7);
   
    averageRating = this.movies.reduce((sum, movie) => sum + movie.rating, 0) / this.movies.length;
    
    titleRating = this.movies.map(movie => ({

      title: movie.title,
      rating: movie.rating

    }));
    
    genreCount = this.movies.reduce((acc: Record<string, number>, movie) => {
    
      movie.genre.forEach(g => {
        acc[g] = (acc[g] || 0) + 1;
      });

      return acc;

    }, {});

    SciFimovies = this.movies.some(movie => movie.genre.includes("Sci-Fi"));
    TarantinoMovies = this.movies.some(movie => movie.director.includes("Tarantino"));
    moviesReleased = this.movies.every(movie => movie.year > 1990)
   
    nolanMovies = this.movies
    .filter(movie => movie.director === "Christopher Nolan" && movie.rating > 8.5)
    .sort((a,b) => b.rating - a.rating)
    .map(movie => movie.title);
    
    DramaMovies = this.movies
    .filter(movie => movie.year < 2000 && movie.genre.includes("Drama"))
    .reduce((sum, movie) => sum + movie.rating, 0) /
    this.movies.filter(movie => movie.year < 2000 && movie.genre.includes("Drama")).length;
    
    yearRating = this.movies
    .filter(movie => movie.rating > 8.5)
    .sort((a, b) => a.year - b.year)
    .map(movie => movie.title);

    genreHighlights = new Set(
    this.movies 
    .filter(movie => movie.rating >8.8)
    .flatMap(movie => movie.genre)
    ).size;
    
    hasAboveNine = this.movies.some(movie => movie.rating > 9);

    allAboveEight = this.movies
      .filter(movie => movie.director === "Christopher Nolan")
      .every(movie => movie.rating > 8.5);
    

    
}