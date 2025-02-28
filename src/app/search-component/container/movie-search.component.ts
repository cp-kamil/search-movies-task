import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { Movie } from "src/app/shared/movie.model";
import { MovieService } from "src/app/search-component/service/movie.service";
import { MovieCardComponent } from "../../shared/movie-card.component";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AsyncPipe, CommonModule } from "@angular/common";
import { LoaderService } from "../service/loader.service";

@Component({
  selector: "app-movie-search",
  templateUrl: "./movie-search.component.html",
  styleUrls: ["./movie-search.component.scss"],
  providers: [MovieService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MovieCardComponent,
    CommonModule,
    FormsModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
})
export class MovieSearchComponent implements OnInit {
  protected readonly searchFilm = "Wyszukaj Film";
  protected readonly noResults = "Brak wyników";
  protected searchControl!: FormControl;
  protected movies$!: Observable<Array<Movie>>;
  protected pending$ = new BehaviorSubject(false);
  protected isLoading: Subject<boolean> = this.loader.isLoading;

  constructor(
    private readonly movieService: MovieService,
    private loader: LoaderService
  ) {}

  public ngOnInit(): void {
    this.searchControl = new FormControl();
    this.getSearchResults();
  }

  private getSearchResults(): void {
    this.pending$.next(true);
    this.movies$ = this.searchControl.valueChanges.pipe(
      // tap((data) => this.movies$= new Subject<Array<Movie>>()),
      debounceTime(500),
      distinctUntilChanged(),
    
      switchMap((searchString) =>
        this.movieService.getMovieBySearchQuery(searchString)
      ),
      map((res: any) => res.Search),
      tap(() => this.pending$.next(false)),
      tap((data) => console.log('dddd', data)),
      
    );
  }
}
