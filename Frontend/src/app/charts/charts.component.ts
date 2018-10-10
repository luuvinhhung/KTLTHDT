import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {


  id = 'PieChart';
  width = 600;
  height = 400;
  type = 'pie3d';
  dataFormat = 'json';
  dataSource;


  constructor() {
    this.dataSource = {
      "chart": {
        "caption": "Electronics Selling",
        "subCaption": "Top 5 stores in last month by revenue",
        "numberprefix": "Rs.(Crore) ",
        "theme": "fint"
      },
      "data": [{
        "label": "Cafe Phin",
        "value": "95"
      },
      {
        "label": "Cafe Expresso",
        "value": "90"
      },
      {
        "label": "Freeze không cafe",
        "value": "76"
      },
      {
        "label": "Freeze cafe",
        "value": "67"
      },
      {
        "label": "Bánh mì",
        "value": "55"
      }
      ]
    }
  }

  ngOnInit() {
  }

}
