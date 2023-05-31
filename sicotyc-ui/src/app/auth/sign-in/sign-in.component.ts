import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { mergeScan } from 'rxjs';


@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'auth-sign-in'
})
export class AuthSignInComponent implements OnInit{


  /**
   * Constructor
   */
  constructor()
  {
  }


  ngOnInit(): void {
    console.log('sign-in');
  }
}
