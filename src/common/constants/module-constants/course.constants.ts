export const CollegeWiseCourseMessages = {
  CREATE_SUMMARY: 'Create a new college course ',
  CREATE_DESCRIPTION: 'Add a new course for a specific college with details.',
  CREATE_BODY_DESCRIPTION: 'The details of the course to be created.',
  GET_ALL_SUMMARY:
    'Get all college courses with pagination  (cursor or page-based)',
  GET_ALL_DESCRIPTION:
    'Retrieve all college course records with pagination support.',
  UPDATE_SUMMARY: 'Update a college course record',
  UPDATE_DESCRIPTION: 'Update an existing college course record by ID.',
  UPDATE_PARAM_DESCRIPTION: 'The ID of the college course to update.',
  UPDATE_BODY_DESCRIPTION: 'The details of the college course to be updated.',
} as const;

export const CollegeWiseCourseDtoMessages = {
  COLLEGE_ID_DESCRIPTION: 'The ID of the college offering the course',
  COURSE_NAME_DESCRIPTION: 'The name of the course',
  COURSE_DURATION_DESCRIPTION: 'The duration of the course in years',
  COURSE_FEE_DESCRIPTION: 'The fee of the course',
} as const;
