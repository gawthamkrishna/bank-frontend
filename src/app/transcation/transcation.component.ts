import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-transcation',
  templateUrl: './transcation.component.html',
  styleUrls: ['./transcation.component.css']
})
export class TranscationComponent implements OnInit {
  allTranscation: any;
  searchkey: string = ''
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.api.getAllTranscations()
      .subscribe((result: any) => {
        this.allTranscation = result.transaction
        console.log(this.allTranscation);

      })
  }
  // search 
  search(event: any) {
    this.searchkey = event.target.value
  }

  // generatepdf()
  generatePdf() {
    var pdf = new jspdf();
    let col = ['Type', 'FromAcno', 'ToAcno', 'Amount']
    let row: any = []
    pdf.setFontSize(16);
    pdf.text('Transcation History', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);


    // convert allTranscation to nested array
    var itemNew = this.allTranscation
    itemNew.forEach(element => {
      var temp = [element.type, element.fromAcno, element.toAcno, element.amount]
      row.push(temp)
    });

    (pdf as any).autoTable(col, row, { startY: 10 })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('Ministatement.pdf');
  }
}
