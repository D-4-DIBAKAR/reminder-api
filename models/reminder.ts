export default class Reminder{
     id: number
     isComplete:boolean
     constructor(public title: string) {
          //Set the id
          //isComplete
          this.id = Date.now()
          this.isComplete=false
     }
}