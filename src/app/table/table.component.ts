import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITableStyle } from '../shared/interfaces/table.interface';
import { EditorService } from '../shared/services/editor.service';
import { IListStyle } from '../shared/interfaces/list.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public isList: boolean = false;

  public tableStyle: ITableStyle = {
    countTR: '',
    countTD: '',
    widthTD: '',
    heightTD: '',
    widthBorder: '',
    typeBorder: '',
    colorBorder: ''
}

  public listStyle: IListStyle = {
    colLi: '',
    typeMarks: 'circle',
  }

  @Input() public isTable!:boolean;
  @Input() public codeTable: string = '';
  @Output() changeValue = new EventEmitter<{isTable:boolean, codeTable:string}>();
  
  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    this.tableStyle = this.editorService.getTableStyle();
    this.codeTable = this.editorService.codeTable; 
  }

  valueChange( event:{isTable: boolean, textEdit:string}){
    this.codeTable = event.textEdit;
    this.isTable = event.isTable;
  }

  valueTableChange(isTable: any){
    this.isTable = isTable;
  }

  check() {
    if (!this.isList) {
      this.isList = true;
    } else this.isList = false;
  }  

  createTable():void {
    this.codeTable = `<table style="margin-top: 10px; border-collapse: collapse;"><tbody>`;    
    for (let i=0; i<  parseInt(this.tableStyle.countTR); i++){
      this.codeTable +=`<tr>`;
      for (let j=0; j<  parseInt(this.tableStyle.countTD); j++){
          this.codeTable +=`<td style="width: ${this.tableStyle.widthTD}px; height: ${this.tableStyle.heightTD}px; border: ${this.tableStyle.widthBorder}px ${this.tableStyle.typeBorder} ${this.tableStyle.colorBorder}; text-align: center;">TD</td>`;
      }    
      this.codeTable +=`</tr>`;
    }
    this.codeTable +=`</tbody></table> `;
    this.isTable = false;
    this.changeValue.emit({isTable:this.isTable, codeTable:this.codeTable}); 
  }

  createList(): void {
    this.codeTable = `<ul style="list-style-type: ${this.listStyle.typeMarks}; margin-left: 20px; margin-top: 10px;">`;
    for(let i=0; i< parseInt(this.listStyle.colLi); i++){
      this.codeTable += `<li style="padding-top: 5px;">item ${i+1}</li>`;
    }
    this.codeTable += '</ul>';
    this.isTable = false;
    this.changeValue.emit({isTable:this.isTable, codeTable:this.codeTable}); 
  }
  

}
