import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'app-menu'
})
export class MenuComponent implements OnInit, OnDestroy
{

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _viewContainerRef: ViewContainerRef,
    private _menuService: MenuService
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
