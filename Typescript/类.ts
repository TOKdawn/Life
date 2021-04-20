interface life {
    life_type: string;
    Id: string
}
class Animal {
    form: string;
    type: life;
    constructor (type: life){
        this.type = type
    }
}