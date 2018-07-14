import { Injectable } from '@angular/core';
import { Flags } from './flags';

@Injectable({
    providedIn: 'root'
  })

export class Functions {

    enumToString (flag: Flags):string
    {
        switch(flag)
        {
            case 1:
                return 'flower';
            case 2:
                return 'sun';
            case 3:
                return 'heart';
            case 4:
                return 'flash';
        }

    }

    stringToEnum(flag: string)
    {
        switch (flag)
        {
            case 'sun':
                return Flags.SUN;
            case 'flower': 
                 return Flags.FLOWER;
            case 'heart': 
              return Flags.HEART;
            case 'flash': 
              return Flags.FLASH;
        }
    }
}