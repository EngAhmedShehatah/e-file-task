import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  search_fields: any[] = [
    {
      criterion: 'Extension',
      value: 'JPG',
      attached_to: []
    },
    {
      criterion: 'Location',
      value: null,
      attached_to: []
    },
    {
      criterion: 'Name',
      value: null,
      attached_to: []
    },
    {
      criterion: 'Creation Date',
      value: null,
      attached_to: []
    }
  ];

  criterias: string[] = ['Extension', 'Location', 'Name', 'Creation Date', 'Date of Birth', 'Finish Date', 'Technology', 'Experience', 'children'];
  used_criterias: string[] = ['Extension', 'Location', 'Name', 'Creation Date'];
  added_criteria: string = 'null';

  constructor(private messageService: MessageService,
    private dragulaService: DragulaService) {
    dragulaService.createGroup("search_fields", {
      removeOnSpill: true
    });
    this.dragulaService.drop("search_fields")
      .subscribe(
        (event) => {
          this.used_criterias = [];
          this.search_fields.map(
            item => {
              this.used_criterias.push(item.criterion);
            }
          );
        }
      );
  }

  ngAfterViewInit() {
    let first_element = document.getElementById('search_field_0');
    let last_element = document.getElementById('search_field_' + (this.search_fields.length - 1));
    let first_position = first_element.getBoundingClientRect();
    let last_position = last_element.getBoundingClientRect();
    console.log('first element position = ', first_position);
    console.log('last element position = ', last_position);
    // let first_last_connection = document.getElementById('first_last_connection');
    // var ctx = (<HTMLCanvasElement>first_last_connection).getContext('2d');
    // ctx.moveTo(position.top + 5, position.left);
    // ctx.lineTo(position.top + 5, position.left + 20);
    // ctx.stroke();
  }

  onAddCriteria() {
    if (this.used_criterias.includes(this.added_criteria) == false && this.added_criteria != 'null') {
      this.search_fields.push({
        criterion: this.added_criteria,
        value: null,
        attached_to: []
      });
      this.used_criterias.push(this.added_criteria);
    } else {
      if (this.added_criteria == 'null') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'You have to choose one criteria !'
        });
      } else {
        this.messageService.add({
          severity: 'info',
          summary: 'Duplication',
          detail: 'This Criteria Already In Use !'
        });
      }
    }
  }

  onAttach(i, j) {
    this.search_fields[i].attached_to.push(this.search_fields[j].criterion);
    this.search_fields[j].attached_to.push(this.search_fields[i].criterion);
  }

  onRemoveCriteria(index) {
    this.search_fields.splice(index, 1);
    this.used_criterias.splice(index, 1);
  }
}
