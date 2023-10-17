export const BlogSearchableFields = ['title', 'content', 'username', 'firstName', 'lastName'];
export const BlogSortableFields = ['createdAt'];
export const BlogFilterableFields = ['title', 'content', 'username', 'firstName', 'lastName'];

export type IOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };