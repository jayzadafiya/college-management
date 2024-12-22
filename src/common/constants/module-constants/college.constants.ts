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

export const CollegeDtoMessages = {
  NAME_DESCRIPTION: 'The name of the college (must be unique).',
  SCORE_DESCRIPTION: 'The score of the college (must be between 1 and 1000).',
  CITY_ID_DESCRIPTION: 'The ID of the city where the college is located.',
  STATE_ID_DESCRIPTION: 'The ID of the state where the college is located.',
} as const;

export const CollegePlacementResponseDtoMessages = {
  YEAR_DESCRIPTION: 'The year for which the placement data is recorded.',
  AVG_PACKAGE_DESCRIPTION: 'The average package offered to students.',
  AVG_HIGHEST_PACKAGE_DESCRIPTION:
    'The average highest package offered to students.',
  AVG_Median_PACKAGE_DESCRIPTION:
    'The average median package offered to students.',
  AVG_PERCENTAGE_PLACEMENT_DESCRIPTION:
    'The average percentage of students placed.',
  PLACEMENT_SECTION_ID_DESCRIPTION:
    'The unique identifier for the placement record',
  PLACEMENT_SECTION_YEAR_DESCRIPTION: 'The year for this placement record',
  PLACEMENT_SECTION_HIGHEST_PLACEMENT_DESCRIPTION:
    'The highest placement salary for this year',
  PLACEMENT_SECTION_AVERAGE_PLACEMENT_DESCRIPTION:
    'The average placement salary for this year',
  PLACEMENT_SECTION_MEDIAN_PLACEMENT_DESCRIPTION:
    'The median placement salary for this year',
  PLACEMENT_SECTION_PLACEMENT_RATE_DESCRIPTION:
    'The percentage of students placed for this year',
  PLACEMENT_SECTION_TREND_DESCRIPTION:
    'The trend of placement rate for this year  (UP, DOWN, or null)',
  AVG_SECTION_DESCRIPTION: 'The average placement data for the college',
  PLCAMENT_SECTION_DESCRIPTION: 'The detailed placement data for the college',
} as const;
