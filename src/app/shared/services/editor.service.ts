import { Injectable } from '@angular/core';
import { ITableStyle } from '../interfaces/table.interface';
import { ITextStyle } from '../interfaces/text-style.interface';
import { IListStyle } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  public codeEditor: string = `<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt reiciendis at laborum in unde labore odit tempore suscipit, laudantium tempora sed repudiandae quaerat nulla pariatur quos eos earum laboriosam! Fugit.</p>`;
  public textStyle: ITextStyle = {
    size: '14px',    
    family: 'sans-serif',
    bold: false,
    italic: false,
    underline: false,
    textColor: 'white',
    bgColor: '#858282'
}

public tableStyle: ITableStyle = {
  countTR: '',
  countTD: '',
  widthTD: '',
  heightTD: '',
  widthBorder: '',
  typeBorder: '',
  colorBorder: 'black'
}

public listStyle: IListStyle = {
  typeLi: '',
  colLi: '',
  typeMarks: '',
}

public codeTable: string ='';
//  `<table style="margin-top: 10px; border-collapse: collapse;"><tbody>`;

public isTable:boolean = false;

constructor() { }

getCodeEditor() {
  return this.codeEditor;
}

getStyle() {
  return this.textStyle;
}
getTableStyle() {
  return this.tableStyle;
}

getListStyle() {
  return this.listStyle;
}
}
