import { DepartmentsService } from './../shared/services/departments.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IDepartment } from './../core/models/IDepartment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branch-dialog',
  templateUrl: './branch-dialog.component.html',
  styleUrls: ['./branch-dialog.component.scss']
})
export class BranchDialogComponent implements OnInit {
  departments: IDepartment[];
  chooseDeparts: IDepartment[];
  toDay: Date = new Date();
  form: FormGroup;
  constructor(private toastr: ToastrService,
    private _departmentsService: DepartmentsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BranchDialogComponent>
  ) { }

  departAdding: IDepartment = {
    BranchCode: '',
    Name: '',
    Address: '',
    PhoneNumber: 0,
  };

  ngOnInit() {
    this.form = this.formBuilder.group({
      BranchCode: '',
      name: '',
      address: '',
      phone: ''
    });
  }
  addDepartment() {
    if (this.departAdding.Name !== '' && this.departAdding.Address !== ''
    && this.departAdding.PhoneNumber !== 0 && isNaN(this.departAdding.PhoneNumber) === false) {
      this._departmentsService.createDepartment(this.departAdding);
      this.dialogRef.close();
      // Toastr
      this.toastr.success('Branch Added!', 'Success!');
    } else if (isNaN(this.departAdding.PhoneNumber) === true) {
      this.toastr.error('Phone Numbers must be Numeric only!', 'Error!', {
        timeOut: 3000,
      });
    } else {
      this.toastr.error('Name, Address and Phone are required', 'Error!', {
        timeOut: 3000,
      });
    }
  }
}
