import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allTranscation: [], searchKey: string, propName: string): any[] {

    const result: any = []
    if (!allTranscation || searchKey == "" || propName == "") {
      return allTranscation
    }
    allTranscation.forEach((item: any) => {
      if (item[propName].trim().toLowerCase().includes(searchKey.toLowerCase())) {
        result.push(item)
      }
    })
    return result;
  }

}
