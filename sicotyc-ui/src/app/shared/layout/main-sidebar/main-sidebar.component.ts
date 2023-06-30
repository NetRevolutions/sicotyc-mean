import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'main-sidebar',
  templateUrl: './main-sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'main-sidebar'
})
export class MainSidebarComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit 
{
  public user?: User;  
  

  /**
   * Constructor
   */
  constructor(    
    private userService: UserService
  )
  {  
    this.user = this.userService.user;
  }
  ngAfterViewInit(): void {
  }
  ngAfterContentInit(): void {
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

  hasToken() {
    return localStorage.getItem('token') ? true : false;
  }
}
