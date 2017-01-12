export const PRO_ADD = 'PRO_ADD'

let nextProId = 0;

export function addPro(text) {
   return {
      type: PRO_ADD,
      id: nextProId++,
      text
   };
}