export default class TableModel {
    public id: number | null | string = null;
    public name: string | null = null;
    public email:string | null = null;
    public surname: string | null = null;
    public phoneNumber: string | null = null;
    public birthdate: string | null = null;
    public citizenship: string | null = null;
    
    constructor(item: any) {
        this._setId(item);
        this._setBirthday(item);
        this._setName(item);
        this._setPhoneNumber(item);
        this._setCitizenship(item);
        this._setSurname(item);
        this._setEmail(item);
        // this._setBody(item);
        // this._setTitle(item);
        // this._setUserId(item);
    }

    /**
     * set id
     * @param id
     * @private
     */
  
    private _setName({name}:{name:string}) {
      this.name = name;
    }

    /**
     * set body
     * @param body
     * @private
     */
    
    private _setEmail({email}:{email:string}) {
        
        this.email = email;
    }
    private  _setId({id,}: {id: number | string}) {
       if (typeof id === 'string' ) {
            this.id = Number(id);
       }
       else {
        this.id = id;
       }
    }

    private _setCitizenship({citizenship}:{citizenship:string}) {
        this.citizenship = citizenship;   
    }

    private _setBirthday({birthdate}:{birthdate:string}) {
        this.birthdate = birthdate;
    }
    private _setPhoneNumber({phoneNumber}:{phoneNumber:string}) {
        this.phoneNumber = phoneNumber;
    }
    private _setSurname({surname}:{surname:string}) {
        this.surname = surname;
    }
}
