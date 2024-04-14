export const handler = async (event, context) => {
  const { body } = event;

  const first = body.a || 0;
  const second = body.b || 0;

  return {
    statusCode: 200,
    body: JSON.stringify(`Hello from Lambda! Your Sum is => ${first + second}`),
  };
};
