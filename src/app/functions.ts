import { Flags } from './flags';

export function stringToEnum(flag: string)
    {
        switch (flag)
        {
            case 'sun':
                return Flags.sun;
            case 'flower': 
                 return Flags.flower;
            case 'heart': 
              return Flags.heart;
            case 'flash': 
              return Flags.flash;
        }
    }

export function enumToString (flag: Flags):string
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
