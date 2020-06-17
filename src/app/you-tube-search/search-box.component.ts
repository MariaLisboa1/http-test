import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { map, filter, debounceTime, tap, switchMap } from 'rxjs/operators';

import { YouTubeSearchService } from './you-tube-search.service';
import { SearchResult } from './search-result.model';

@Component({
  selector: 'app-search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YouTubeSearchService,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    // convert the `keyup` event into an observable stream
    fromEvent(this.el.nativeElement, 'keyup')
      .pipe(map((e: any) => e.target.value)) // extract the value of the input
      .pipe(filter((text: string) => text.length > 1)) // filter out if empty
      .pipe(debounceTime(250))                         // only once every 250ms
      .pipe(tap(() => this.loading.emit(true)))         // enable loading
      // search, discarding old events if new input comes in
      .pipe(map((query: string) => this.youtube.search(query)))
      .pipe(switchMap(() => interval(1000)))
      // act on the return of the search
      .subscribe(
        (results: any) => { // on sucesss
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.emit(false);
        },
        () => { // on completion
          this.loading.emit(false);
        }
      );
  }
}
