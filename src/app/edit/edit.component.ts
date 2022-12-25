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
  @Input() isTable: boolean = false;
  public color: string = 'black';
  
  @Input() textStyle: ITextStyle = {
    size: '',    
    family: 'sans-serif',
    bold: false,
    italic: false,
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
    this.result += this.codeTable;
    this.changeValue.emit(this.result);  
    this.result = '';
    this.codeTable = '';
  }

  editClick(): void {
    this.changeValue.emit(this.codeEditor);  
    this.result = this.codeEditor;
    this.isStyle = false;    
  }

  styleClick():void {
    this.isStyle = true;
  }

  colorClick(event:any): void{    
    this.color = event.target.classList[1];    
    if (this.isColorText) {
      this.textStyle.textColor = this.color;
      this.isColorText = false;
    }
    if (this.isColorBg) {
      this.textStyle.bgColor = this.color;
      this.isColorBg = false;
    }    
  }
  colorText(): void{
    this.isColorText = true;    
  }
  colorBg(): void{
    this.isColorBg = true;  
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event): void{
      if (event.target !== this.bgColor?.nativeElement && event.target !== this.bgText?.nativeElement && event.target!==this.colors?.nativeElement) {
        this.isColorText = false;
        this.isColorBg = false;
    }    
  }

  addClick(): void {
    this.isTable = true;
    this.changeValueTable.emit({isTable:this.isTable, codeTable: this.codeTable});  
    this.result = this.codeEditor + this.codeTable;
    this.changeValue.emit(this.result);  
  }


}
