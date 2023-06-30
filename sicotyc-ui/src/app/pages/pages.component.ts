import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'app-pages'
})
export class PagesComponent implements OnInit, OnDestroy, AfterViewInit
{
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor() {}
  

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngAfterViewInit(): void {
    // $('[data-widget="treeview"]').each(function() {
    //   AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    // });

    AdminLte.Layout._jQueryInterface.call($('body'));
    AdminLte.PushMenu._jQueryInterface.call($('[data-widget="pushmenu"]'));
  }

  /**
   * On init
   */
  ngOnInit(): void
  {     
    // AdminLte.Layout._jQueryInterface.call($('body'));
    // AdminLte.PushMenu._jQueryInterface.call($('[data-widget="pushmenu"]'));
    
    // $('[data-widget="treeview"]').each(function() {
    //   AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    // });
    
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }
}
