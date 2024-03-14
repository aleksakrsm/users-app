import { AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function uniqueAliasValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if(!control.touched || !control.dirty) return null;

        // console.log("poziv validatora uniqueAliasValidator()");
        let aliases:string[]=[];
        for(let i = 0;;i++){
            if(control.get(i+'')){
                aliases.push(control.get(i+'')?.value.toLowerCase());
            }else{
                break;
            }
        }
        return areAllAliasesUnique(aliases)? null: {"repeatedaliases":"some values repeat"};
    };
  }
export function myPatternValidator(pattern:RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        // if(!control.touched || !control.dirty) return null;
        if(!control.touched && !control.dirty) return null;
        // if(!control.touched) return null;
        // if(!control.dirty) return null;

        return pattern.test(control.value)? null: {"failedRegExp":"does not satisfy regex pattern"};
    };
  }
  
  function areAllAliasesUnique(aliases: string[]): boolean {
      const set = new Set<string>();
      for (const value of aliases) {
          if (set.has(value.toLowerCase())) {
              return false;
            }
            set.add(value);
        }
        return true;
    }