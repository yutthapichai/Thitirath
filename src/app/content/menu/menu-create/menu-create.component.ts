import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MenuService } from '../menu.service';
import { mimeType } from '../../mime.type.validator';
import { Menu } from '../menu.models';



@Component({
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css']
})
export class MenucreateComponent implements OnInit {

  public form: FormGroup;
  public imagePreview: string;
  public mode: string;
  public menu: Menu;
  public menuId: string;
  public menuCreator: string;
  public saveMenu = 'Save Menu';

  constructor(
    private objectMenuService: MenuService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name:   new FormControl(null, { validators: [Validators.required] }),
      min60:  new FormControl(null, { validators: [Validators.required] }),
      min90:  new FormControl(null, { validators: [Validators.required] }),
      detail: new FormControl(null, { validators: [Validators.required] }),
      image:  new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    this.router.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('menuID')) {
          this.mode = 'edit';
          this.saveMenu = 'Update Menu';
          this.menuId = paramMap.get('menuID');
          this.objectMenuService.editmenu(this.menuId).subscribe(
            Response => {
              this.menuCreator = Response.creator;
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
        } else {
          this.mode = 'Create';
          this.menuId = null;
        }
      }
    );
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
      } else {
        this.objectMenuService.updatemenu(
          this.menuId,
          this.form.value.name,
          this.form.value.min60,
          this.form.value.min90,
          this.form.value.detail,
          this.form.value.image,
          this.menuCreator
        );
        this.form.reset();
      }
    }
  }
  /*
  public onEdit(menuId: string) {
    this.objectMenuService.editmenu(menuId).subscribe(
      Response => {
        this.menuId = Response._id;
        this.menuCreator = Response.creator;
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
  }*/

}
