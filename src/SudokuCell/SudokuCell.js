export default class SudokuCell{
    constructor(val, changable){
        this.val = val;
        this.changable = changable;
        this.image = "/assets/" + val + ".svg"
    }
}