import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ITextStyle } from '../shared/interfaces/text-style.interface';
import { EditorService } from '../shared/services/editor.service';
import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent implements OnInit {

  @Input() codeEditor: string = '';
  @Output() changeValue = new EventEmitter<string>();

  @Input() textStyle: ITextStyle = {
    size: '',    
    family: '',
    bold: false,
    italic: false,
    underline: false,
    textColor: '',
    bgColor: ''
  };

  @Output() changeStyle = new EventEmitter<Object>();

  
  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    this.textStyle = this.editorService.getStyle();
  }


}
