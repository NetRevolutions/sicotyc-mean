import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';

declare const App : any;
import * as $ from 'jquery'; 
import * as AdminLte from 'admin-lte';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',  
  exportAs: 'app-menu'
})
export class MenuComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit
{
  menuItems: any[] = [];
  mySubscription: any;

  isMobile : boolean = this.deviceService.isMobile();
  isTablet : boolean = this.deviceService.isTablet();
  isDesktopDevice: boolean = this.deviceService.isDesktop();

  body = document.getElementsByTagName('body')[0];

  /**
   * Constructor
   */
  constructor(
    private deviceService: DeviceDetectorService,
    private _menuService: MenuService
  )
  {
    this.menuItems = _menuService.menu;    
    //console.log(this.menuItems);
  }
  ngAfterContentInit(): void {
  }
  ngAfterViewInit(): void {
    $('[data-widget="treeview"]').each(function() { 
      AdminLte.Treeview._jQueryInterface.call($(this), 'init'); 
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
    // this.body.classList.remove("login-page");
    // this.body.classList.add("hold-transition", "sidebar-mini", "layout-fixed", "layout-navbar-fixed", "layout-footer-fixed");

    //App.initMainPage();
    // this.HideMenu();

    // $('[data-widget="treeview"]').each(function() {
    //   AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    //   AdminLte.Layout._jQueryInterface.call($('body'));
    //   AdminLte.PushMenu._jQueryInterface.call($('[data-widget="pushmenu"]'));
    // });

    //$('[data-widget="treeview"]').Treeview('init');

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
  SetFocusMenu(SubMenu: HTMLElement, MainMenu: HTMLElement) {
    // SubMenu = (SubMenu.currentTarget as HTMLElement);
    var links = document.getElementsByClassName('nav-link active');

    for (let i : number = links.length-1; i >= 0; i--){
      const link = links[i] as HTMLElement;
      link.classList.remove('active');
    }

    SubMenu.classList.add('active');
    MainMenu.classList.add('active');
  };

  HideMenu() {
    if (this.isDesktopDevice === false) {
      if (window.innerWidth < 1024) {
        this.body.classList.remove("sidebar-open");
        this.body.classList.add("sidebar-collapse");        
      }
    }
  };

  toggle(): void { 
    const portalBody = $('#portalBody'); 
    if ( portalBody.hasClass( 'sidebar-collapse' )) { 
      portalBody.removeClass('sidebar-collapse'); 
      portalBody.addClass('sidebar-open'); 
    } 
    else { 
      portalBody.addClass('sidebar-collapse'); 
    } 
  }
}
