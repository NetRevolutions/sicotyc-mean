import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { enumLookupCodeGroup } from 'app/enum/lookupCodeGroups.enum';
import { returnLookupCodeGroups, returnLookupCodes } from '../interfaces/lookup.interface'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor( private http: HttpClient) { }

  // Lookup Code Group - section
  getLookupCodeGroupsName() {
    return this.http.get(`${base_url}/lookupCodeGroups`);
  }  


  // Lookup Code - section
  getLookupCodesByLookupName(lcg: enumLookupCodeGroup) {    
    return new Promise((resolve, reject) =>{
      this.getLookupCodeGroupsName()
      .subscribe((lcgResult: any) => {
        if (!lcgResult.ok) {
          console.log(lcgResult.msg);
          reject(lcgResult.msg)
        }     
        else {

          // Obtenemos el Id del LCG (TODO: Mejorar para que sea en una sola llamada)
          let lcgIDselected = lcgResult.lookupCodeGroups.find(({ lookupCodeGroupName }) => lookupCodeGroupName === lcg)._id
          let lcgNameselected = lcgResult.lookupCodeGroups.find(({ lookupCodeGroupName }) => lookupCodeGroupName === lcg).lookupCodeGroupName
          //console.log(lcgIDselected);             
          this.getLookupCodesByLCGID(lcgIDselected)
          .subscribe((lcResult: any) => {
            if (!lcResult.ok) {
              console.log(lcResult.msg);
              reject(lcResult.msg)
            } else {  
              let results = [];   
              if (lcResult.lookupCodes.length > 0) {
                lcResult.lookupCodes.forEach(element => {
                  let item = {} as returnLookupCodes;
                  item.lcgId = lcgIDselected;
                  item.lcgName = lcgNameselected;
                  item.lcgId = element._id;
                  item.lcName = element.lookupCodeName;
                  item.lcValue = element.lookupCodeValue;
                  item.lcOrder = element.lookupCodeOrder;
                  results.push(item);
                });
                resolve(results);
              } else {
                resolve([]);
              }        
              
            }
          });          
        }
      })
    });    
  }

  getLookupCodesByLCGID(lcgID: string) {
    return this.http.get(`${base_url}/lookupCodes/${lcgID}`);
  }
}
