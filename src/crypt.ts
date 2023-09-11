import bcrypt from 'bcrypt';
export class Crypt {
   private saltRounds = 10;

   async encrypt(plain:string): Promise<string> {
      return await bcrypt.hash(plain, this.saltRounds);
   }

   async compare(plain:string, encrypted:string): Promise<boolean> {
        return await bcrypt.compare(plain, encrypted);
     }
}