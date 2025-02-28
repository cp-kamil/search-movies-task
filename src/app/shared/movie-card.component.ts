import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  signal,
  SimpleChanges,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Movie } from './movie.model';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragSortEvent,
  CdkDragStart,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule,  } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table'
import {MatTable} from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  {fileName: 'record1.png', filePath: 'https://github.com/konnomiya/ServerlessChatRoom/raw/master/images/chatroom_dm_3.PNG'},
  {fileName: 'record2.png', filePath: 'https://github.com/konnomiya/ServerlessChatRoom/raw/master/images/chatroom_dm_3.PNG'},
  {fileName: 'record2.png',}
];


// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
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
  set movie(data:any){
    this.dataMovie = data
    this.dataSource = new MatTableDataSource(data)
  }
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  columnNames: string[] = []
  displayedColumns: string[] = [];
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

  protected dragStarted(event: any, index: number ):void {
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
