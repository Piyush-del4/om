import { Model, Types } from 'mongoose';

export async function assertOwnership<T>(
  ModelClass: Model<T>,
  resourceId: string,
  userId: string,
  userField: string = 'userId'
): Promise<T> {
  const query: any = {
    _id: new Types.ObjectId(resourceId),
    [userField]: new Types.ObjectId(userId),
    isDeleted: { $ne: true } // Ignore soft-deleted documents
  };

  const doc = await ModelClass.findOne(query);

  if (!doc) {
    // Return 404 instead of 403 to prevent confirmation of resource existence (security best practice)
    const err = new Error('Resource not found') as any;
    err.statusCode = 404;
    err.code = 'NOT_FOUND';
    throw err;
  }

  return doc;
}
