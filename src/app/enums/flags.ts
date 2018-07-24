export enum FlagType {
    flower = 'flower',
    sun = 'sun',
    heart = 'heart',
    flash = 'flash'
}

export namespace FlagsHelpers {

  export function stringToEnum(flag: string) {
      switch (flag) {
          case 'sun':
              return FlagType.sun;
          case 'flower':
              return FlagType.flower;
          case 'heart':
              return FlagType.heart;
          case 'flash':
              return FlagType.flash;
      }
  }

  export function getSize() {
      return Object.keys(FlagType).length / 2;
  }
}


