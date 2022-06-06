export class NoteRequest{
  constructor(
    public noteId: string,
    public title:string,
    public description: string,
    public priorityId: number
  ){

  }
}
