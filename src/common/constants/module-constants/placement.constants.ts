export const PlacementMessages = {
  CREATE_SUMMARY: 'Create a new college placement record',
  CREATE_DESCRIPTION: 'Creates a new collage placement in the database.',
  CREATE_BODY_DESCRIPTION: 'The details of the placement data to be created.',
  GET_ALL_SUMMARY: 'Get all college placements with pagination',
  GET_ALL_DESCRIPTION:
    'Retrieve all college placement records with pagination support.',
  UPDATE_SUMMARY: 'Update a college placement record',
  UPDATE_DESCRIPTION: 'Update an existing college placement record by ID',
  UPDATE_PARAM_DESCRIPTION: 'The ID of the placement record to update',
  UPDATE_BODY_DESCRIPTION: 'The details of the placement data to be updated',
} as const;

export const PlacementDtoMessages = {
  COLLEGE_ID_DESCRIPTION: 'The ID of the college',
  YEAR_DESCRIPTION: 'The year of the placement data',
  HIGHEST_PLACEMENT_DESCRIPTION: 'The highest placement salary',
  AVERAGE_PLACEMENT_DESCRIPTION: 'The average placement salary',
  MEDIAN_PLACEMENT_DESCRIPTION: 'The median placement salary',
  PLACEMENT_RATE_DESCRIPTION: 'The placement rate (percentage)',
} as const;
