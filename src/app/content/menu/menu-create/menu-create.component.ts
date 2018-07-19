import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuService } from '../menu.service';
import { mimeType } from '../../mime.type.validator';
import { Menu } from '../menu.models';

@Injectable({ providedIn: 'root' })

@Component({
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css']
})
export class MenucreateComponent implements OnInit {

  public form: FormGroup;
  public imagePreview: string;
  public mode = 'Create';
  public menu: Menu;
  public menuId: string;

  constructor(private objectMenuService: MenuService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name:   new FormControl(null, { validators: [Validators.required] }),
      min60:  new FormControl(null, { validators: [Validators.required] }),
      min90:  new FormControl(null, { validators: [Validators.required] }),
      detail: new FormControl(null, { validators: [Validators.required] }),
      image:  new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
  }

  public onImagePickd() {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => { this.imagePreview = reader.result; };
    reader.readAsDataURL(file);
  }

  public onsaveMenu() {
    if (this.form.invalid) {
      return;
    } else {
      if (this.mode === 'Create') {
        this.objectMenuService.addmenu(
          this.form.value.name,
          this.form.value.min60,
          this.form.value.min90,
          this.form.value.detail,
          this.form.value.image
        );
        this.form.reset();
      }
    }
  }

  public onEdit(menuId: string) {
    this.objectMenuService.editmenu(menuId).subscribe(
      Response => {
        console.log(Response);
        this.menuId = Response._id;
        this.mode = 'Edit';
        this.menu = {
          id: Response._id,
          name: Response.name,
          min60: Response.min60,
          min90: Response.min90,
          detail: Response.detail,
          imagePath: Response.imagePath,
          creator: Response.creator
        };
        this.form.setValue({
          name: this.menu.name,
          min60: this.menu.min60,
          min90: this.menu.min90,
          detail: this.menu.detail,
          image: this.menu.imagePath
        });
      }
    );
  }

}
