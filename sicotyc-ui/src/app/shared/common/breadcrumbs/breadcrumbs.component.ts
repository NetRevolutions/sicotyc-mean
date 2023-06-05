import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  exportAs: 'app-breadcrumbs'
})
export class BreadcrumbsComponent implements OnInit, OnDestroy
{
  public title: String;
  public titleSubs$: Subscription;

  /**
   * Constructor
   */
  constructor( private _router: Router) {
    this.titleSubs$ = this.getPathTitle()
                        .subscribe(({title}) => {      
                          this.title = title;
                        });
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
    this.titleSubs$.unsubscribe();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  getPathTitle() {
    return this._router.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map((event: ActivationEnd) => event.snapshot.data ),
    );
  }
}
