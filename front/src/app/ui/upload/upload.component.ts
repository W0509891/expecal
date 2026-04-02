import {Component, Injectable} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-upload',
  imports: [ReactiveFormsModule],
  styleUrl: './upload.component.scss'
  ,template: `
    <div class="upload-container">
        <div>
            <h3>Upload a new bank statement</h3>
                <svg (click)="UploadService.showUploadForm()" class="svg">
                    <use href="/assets/svg/x.svg"></use>
                </svg>
        </div>

        <div>
            <form (submit)="UploadService.handle($event, fileInput)">
                <div class="file-input-wrapper">
                  <input type="file"
                       id="file"
                       #fileInput
                  />
                </div>
                <div class="submit-wrapper">
                  <button type="submit">Submit</button>
                </div>
            </form>
      </div>
    </div>
  `
})
export class UploadComponent {
  constructor(public UploadService: UploadService){}
}


@Injectable({providedIn: 'root'})
export class UploadService {
  uploadForm: boolean = false

  showUploadForm(){
    this.uploadForm = !this.uploadForm
  }

  handle(event: Event, fileInput: HTMLInputElement){
    event.preventDefault()
    if (!fileInput.files || fileInput.files.length === 0) {
      console.error("No file selected")
      return
    }
    const file = fileInput.files[0]
    const api = "http://localhost:8000/upload"
    const formData = new FormData()
    formData.append('file', file)

    const post = async() =>
      fetch(api, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      }
      ).then(res => res.json())

    post()
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

}
