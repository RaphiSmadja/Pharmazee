import { Component, OnInit } from '@angular/core';
import {Orders} from '../../entities/Orders';
import {MessageService, SelectItem} from 'primeng/api';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Orders[] = [];
  private statusArr: any[] = [];
  private idToDelete: number;
  private sortOptions: SelectItem[];
  private sortKey: string;
  sortField: string;
  sortOrder: number;
  cols: any [];
  constructor(private orderService: OrderService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {

    this.statusArr = [
      {label: 'Payment pending', value: 'Payment pending'},
      {label: 'Order in preparation', value: 'Order in preparation'},
      {label: 'Order ready', value: 'Order ready'},
      {label: 'Cancelled order', value: 'Cancelled order'},
      {label: 'Done order', value: 'Done order'},
      {label: 'Blocked order', value: 'Blocked order'}
      ];
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'price', header: 'Prix Total' },
      { field: 'status', header: 'Status' },
      { field: 'nbloyalty', header: 'Nombre de points gagnés' },
      { field: 'createdAt', header: 'Date de création' },
    ];

    this.listAllOrder();
  }

  updateOrder(rowIndex, id: any) {
    console.log(this.orders[rowIndex]);
    console.log(id);
    this.orderService.updateOrder(id, this.orders[rowIndex].status).subscribe(
      (val) => {
        console.log(val);
        if (val.msg === 'OK') {
          this.messageService.add({severity: 'warn', summary: 'Modification', detail: 'ligne : ' + id + ' a bien été modifié'});
        }
      },
      (err) => {
        console.error(err);
      },
    );
  }

  showConfirm(id: any) {
    this.messageService.clear();
    this.idToDelete = id;
    this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed'});
  }

  deleteOrder(id: number) {
    console.log(id);
    this.orderService.deleteOrder(id).subscribe(
      (val) => {
        console.log(val);
        if (val.msg === 'OK') {
          this.messageService.add({severity: 'info', summary: 'Suppression', detail: 'la ligne a bien été supprimé'});
          this.listAllOrder();
        }
      },
      (err) => {
        console.error(err);
      },
    );
  }

  listAllOrder() {
    this.orderService.listAll().subscribe(res => {
      console.log(res);
      if (res.msg === 'OK') {
        this.orders = res.result;
        console.log(this.orders);
      } else {
        console.log('Error:' + res.result);
      }
    });
  }

  onReject() {
    this.messageService.clear('c');
  }

  onConfirm() {
    this.messageService.clear('c');
    console.log('suppri ' + this.idToDelete);
    this.deleteOrder(this.idToDelete);
  }

  detailOrder(id) {
    this.router.navigate(['order-detail/' + id]);
  }
}
