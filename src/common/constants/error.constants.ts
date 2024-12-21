export const ErrorMessages = {
  STATE_NOT_FOUND: 'State with provided ID does not exist',
  STATE_ALREADY_EXISTS: 'State with this name already exists',
  STATE_SEED_FAILED: 'An error occurred while seeding the states.',
  CITY_NOT_FOUND: 'City with provided ID does not exist',
  CITY_ALREADY_EXISTS: 'City with this name already exists',
  CITY_ALREADY_EXISTS_IN_STATE:
    'City with this name already exists in the specified state',
  COLLEGE_ALREADY_EXISTS:
    'College already exists in the specified city and state.',
  COLLEGE_NOT_FOUND: 'College with provided ID does not exist',
} as const;
