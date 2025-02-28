import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Movie } from './movie.model';
import {
  CdkDragStart,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule,  } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-movie',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DragDropModule, BrowserModule, MatSlideToggleModule, MatTableModule, MatSortModule],
})
export class MovieCardComponent implements OnInit,  AfterViewInit {
  @Input() 
  set movie(data:Movie[]){
    this.dataMovie = data
    this.dataSource = new MatTableDataSource(data)
  }
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  protected columnNames: string[] = []
  protected displayedColumns: string[] = [];
  protected dataSource!: MatTableDataSource<Movie>
  protected previousIndex: number = 1
  protected readonly imgRow = "Poster"
  protected readonly imgId = 'imdbID'
  protected dataMovie: Movie[] = []
  
  public ngOnInit(): void {
    this.columnNames = Object.keys(this.dataMovie[0]);
  }

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.setDisplayedColumns();
  }

  protected capitalize(text: string): string {
    if(text === this.imgId){
      return text.charAt(0).toLocaleLowerCase() + text.slice(1)
    }
      return text.charAt(0).toUpperCase() + text.slice(1);
  }

  protected dragStarted(event: CdkDragStart, index: number ):void {
    this.previousIndex = index
  }

  protected dropListDropped(event: any, index: number):void {
    if (event) {
      moveItemInArray(this.columnNames, this.previousIndex, index);
      this.setDisplayedColumns();
    }
  }

  private setDisplayedColumns(): void {
    const newArrWithIndex = this.columnNames.map((value)=> {
      return {name: value};
    });
    newArrWithIndex.forEach(( colunm: any, index: number) => {
      colunm.index = index;
      this.displayedColumns[index] = colunm.col;
    });
  }
}
