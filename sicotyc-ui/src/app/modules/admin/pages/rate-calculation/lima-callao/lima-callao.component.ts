import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { RateCalculationLimaCallaoService } from './lima-callao.service';

@Component({
  selector: 'rate-calculation-lima-callao',
  templateUrl: './lima-callao.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'rate-calculation-lima-callao'
})
export class RateCalculationLimaCallaoComponent implements OnInit, OnDestroy
{


  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _viewContainerRef: ViewContainerRef,
    private _rateCalculationLimaCallaoService: RateCalculationLimaCallaoService
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
