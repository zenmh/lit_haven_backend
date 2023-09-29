type IOrderedBook = {
  bookId: string;
  quantity: number;
};

type IOrderDataRequest = {
  orderedBooks: IOrderedBook[];
  userId: string;
};

export { IOrderDataRequest, IOrderedBook };
