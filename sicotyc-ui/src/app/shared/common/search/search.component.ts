import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'search'
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy
{


  /**
   * Constructor
   */
  constructor(
    private _elementRef: ElementRef,
    private _httpClient: HttpClient,
        private _renderer2: Renderer2
  )
  {    
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void
  {
    
  }


  /**
   * On init
   */
  ngOnInit(): void
  {
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
  }



}
