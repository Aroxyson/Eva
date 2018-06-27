export class Items {
    name: string = '';
    flags: string = '';
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
