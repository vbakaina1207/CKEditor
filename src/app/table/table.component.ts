import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITableStyle } from '../shared/interfaces/table.interface';
import { EditorService } from '../shared/services/editor.service';
import { IListStyle } from '../shared/interfaces/list.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public isList: boolean = false;
  public isExample: boolean = false;

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
    typeLi: '',
    colLi: '',
    typeMarks: '',
  }

  @Input() public isTable!:boolean;
  @Input() public codeTable: string = '';
  @Output() changeValue = new EventEmitter<{isTable:boolean, codeTable:string}>();
  public codeExample: string = '';
  
  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    this.tableStyle = this.editorService.getTableStyle();
    this.codeTable = this.editorService.codeTable; 
    this.listStyle = this.editorService.getListStyle();
  }

  valueChange( event:{isTable: boolean, textEdit:string}){
    this.codeTable = event.textEdit;
    this.isTable = event.isTable;
  }

  valueTableChange(isTable: any){
    this.isTable = isTable;
  }


  createTable():void {
    this.tableCss();
    this.isTable = false;
    this.changeValue.emit({isTable:this.isTable, codeTable:this.codeTable}); 
    this.tableStyle.colorBorder='';
    this.tableStyle.countTD='';
    this.tableStyle.countTR='';
    this.tableStyle.heightTD='';
    this.tableStyle.typeBorder='';
    this.tableStyle.widthBorder='';
    this.tableStyle.widthTD='';

  }

  createList(): void {
    this.listCss();
    this.isTable = false;
    this.changeValue.emit({isTable:this.isTable, codeTable:this.codeTable}); 
    this.listStyle.colLi='';
    this.listStyle.typeLi='';
    this.listStyle.typeMarks='';
  }
  

  onSubmitTable(form: NgForm){
    if (form.valid) this.createTable();
  }

  onSubmitList(form: NgForm){
    if (form.valid) this.createList();
  }

  tableCss():void {
    this.codeTable = `<table style="margin-top: 10px; border-collapse: collapse;"><tbody>`;    
    for (let i=0; i<  parseInt(this.tableStyle.countTR); i++){
      this.codeTable +=`<tr>`;
      for (let j=0; j< parseInt(this.tableStyle.countTD); j++){
          this.codeTable +=`<td style="width: ${this.tableStyle.widthTD}px; height: ${this.tableStyle.heightTD}px; border: ${this.tableStyle.widthBorder}px ${this.tableStyle.typeBorder} ${this.tableStyle.colorBorder}; text-align: center;">TD</td>`;
      }    
      this.codeTable +=`</tr>`;
    }
    this.codeTable +=`</tbody></table> `;
  }

  listCss():void {
    this.codeTable = `<${this.listStyle.typeLi} style="list-style-type: ${this.listStyle.typeMarks}; margin-left: 20px; margin-top: 10px;">`;
    for(let i=0; i< parseInt(this.listStyle.colLi); i++){
      this.codeTable += `<li style="padding-top: 5px;">item ${i+1}</li>`;
    }
    this.codeTable += `</${this.listStyle.typeLi}>`;
  }

  exampleClick():void {
    if (!this.isList) {
      this.tableCss();      
      } else {
        this.listCss();
    };
    this.codeExample = this.codeTable;
    this.isExample = false;
  }

  exampleClose():void {
    this.isExample = true; 
    this.codeExample = '';
  }

  onChangeRadio(list:string): void{
    if (list == "tabl") this.isList = false;
    if (list == "list") this.isList = true;
    this.codeExample = '';
  }
}
