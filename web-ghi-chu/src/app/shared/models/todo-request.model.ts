export class TodoRequest{
  constructor(
    public todoId: string,
    public task:string,
    public status: boolean,
  ){

  }
}
