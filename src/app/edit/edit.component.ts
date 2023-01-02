import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditorService } from '../shared/services/editor.service';
import { ITextStyle } from '../shared/interfaces/text-style.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() codeEditor:string = "";
  @Output() changeValue = new EventEmitter<string>();
  @Output() changeValueTable = new EventEmitter<{isTable:boolean, codeTable:string}>();
  
  
  public result:string = "";
  public isColor: boolean = false;
  public isColorText: boolean = false;
  public isColorBg: boolean = false;
  public isStyle: boolean = false;
  public isClose: boolean = false;
  public isError: boolean = false;
  public isBlock: boolean = false;
  @Input() isTable: boolean = false;
  public color: string = 'black';
  public password: string = 'admin';
  
  @Input() textStyle: ITextStyle = {
    size: '',    
    family: 'sans-serif',
    bold: false,
    italic: false,
    underline: false,
    textColor: '',
    bgColor: ''
}
@Input() codeTable: string = '';

@ViewChild('bgColor') bgColor!: ElementRef;
@ViewChild('bgText') bgText!: ElementRef;
@ViewChild('colors') colors!: ElementRef;


  constructor(private editorService: EditorService, private el: ElementRef) {}

  ngOnInit(): void {
    this.codeEditor = this.editorService.getCodeEditor();
    this.textStyle = this.editorService.getStyle();
    this.isTable = this.editorService.isTable;
  }
  

  valueChange(textEdit: string){
    this.result = textEdit;
    this.result += this.codeTable;
  }

  valueTableChange(event:{isTable: any, codeTable: string}){
    this.isTable = event.isTable;
    this.codeTable = event.codeTable;
    this.result += this.codeTable;
  }

  saveClick():void {
    this.codeEditor = this.result ;     
    this.changeValue.emit(this.result);  
  }

  editClick(): void {
    this.changeValue.emit(this.codeEditor);  
    this.result = this.codeEditor;
    this.isStyle = false;    
  }

  styleClick():void {
    this.isStyle = true;
  }

  addClick(): void {
    this.isTable = true;
    this.changeValueTable.emit({isTable:this.isTable, codeTable: this.codeTable});  
    this.result = this.codeEditor + this.codeTable;
    this.changeValue.emit(this.result);  
  }

  cssCreate(event: any):void {
    console.log(event.target.textContent);
    if (event.target.textContent=='a') {
      this.result += `\n<${event.target.textContent}  href=""></${event.target.textContent}>`;
    } else {
      this.result += `\n<${event.target.textContent}></${event.target.textContent}>`;
    }
  }

  blockClick():void {
    this.isBlock = true;
  }

  unblockClick(password: string):void {
    if (password == this.password) {
      this.isBlock = false;
    } else {
      this.isError = true;
    }
  }

  onChangePassword(password: string):void {
    if (password=='' || password == this.password) this.isError = false;
  }



}

