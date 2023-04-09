import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'messages'
})
export class MessagesComponent implements OnInit, OnDestroy
{


  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _messagesService: MessagesService,   
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
