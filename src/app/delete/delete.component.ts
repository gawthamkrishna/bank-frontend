import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  @Input() item: string | undefined
  @Output() onCancel = new EventEmitter()
  @Output() onDelete = new EventEmitter()
  cancel() {
    // to occur user defined events - emit()
    this.onCancel.emit()
  }

  deleteAcc() {
    this.onDelete.emit(this.item)
  }

}
