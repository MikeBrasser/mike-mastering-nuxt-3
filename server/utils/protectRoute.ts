import { H3Event } from 'h3';

// If the user does not exist on the request, throw a 401 error
export default (event: H3Event) => {
  const { user } = event.context;
  const userHasAccess =
    user && user.user_metadata.courses?.includes(1);

  if (!userHasAccess) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
};
