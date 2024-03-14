import { Component } from "@angular/core";
import { CommonModule, JsonPipe } from "@angular/common";
@Component({
    selector: 'json-pipe',
    standalone:true,
    imports:[JsonPipe],
    template: `<div>
      <p>Without JSON pipe:</p>
      <pre>{{ object }}</pre>
      <p>With JSON pipe:</p>
      <pre>{{ object | json }}</pre>
    </div>`,
  })
  export class JsonPipeComponent {
    object: Object = {foo: 'bar', baz: 'qux', nested: {xyz: 3, numbers: [1, 2, 3, 4, 5]}};
  }