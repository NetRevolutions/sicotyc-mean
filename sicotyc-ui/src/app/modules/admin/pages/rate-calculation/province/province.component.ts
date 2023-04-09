import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { RateCalculationProvinceService } from './province.service';

@Component({
  selector: 'rate-calculation-province',
  templateUrl: './province.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'rate-calculation-province'
})
export class RateCalculationProvinceComponent implements OnInit, OnDestroy 
{


  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _viewContainerRef: ViewContainerRef,
    private _rateCalculationProvinceService: RateCalculationProvinceService
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
