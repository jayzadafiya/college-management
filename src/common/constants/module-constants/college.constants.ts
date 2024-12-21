export const CollegeMessages = {
  CREATE_SUMMARY: 'Create a new college',
  CREATE_DESCRIPTION:
    'This endpoint allows you to retrieve a list of colleges with pagination. You can choose either cursor-based or page-based pagination. Provide either a cursor or a page, but not both.',
  CREATE_BODY_DESCRIPTION: 'The details of the college to be created.',
  GET_ALL_SUMMARY: 'Get all colleges with pagination (cursor or page-based)',
  GET_ALL_DESCRIPTION:
    'This endpoint retrieves a list of all colleges with support for both cursor-based and page-based pagination. You can use either the `cursor` or `page` parameter to navigate through the results, with the ability to limit the number of records returned using the `limit` parameter.',
  UPDATE_SUMMARY: 'Update a College',
  UPDATE_DESCRIPTION: 'Update a College',
  UPDATE_BODY_DESCRIPTION: 'The details of the college to be updated.',
  UPDATE_PARAM_DESCRIPTION: 'ID of the college to update',
} as const;
