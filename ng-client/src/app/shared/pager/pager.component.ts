import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() totalItems: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onPageChanged(evt) {
    this.pageChanged.emit(evt);
    // this.shopParams.pageIndex = evt.page;
  }

}
