import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'app-main-footer'
})
export class MainFooterComponent implements OnInit, OnDestroy 
{

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _viewContainerRef: ViewContainerRef
  )
  {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

}
