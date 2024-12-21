export const ErrorMessages = {
  STATE_NOT_FOUND: 'State with provided ID does not exist',
  STATE_ALREADY_EXISTS: 'State with this name already exists',
  CITY_NOT_FOUND: 'City with provided ID does not exist',
  CITY_ALREADY_EXISTS: 'City with this name already exists',
  CITY_ALREADY_EXISTS_IN_STATE:
    'City with this name already exists in the specified state',
} as const;
