import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../shared/address.model';

@Component({
  selector: 'lm-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() address: Address;

  constructor() { }

  ngOnInit() {
  }

}
