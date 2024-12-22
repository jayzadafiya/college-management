// src/common/constants/module-constants/city.constants.ts

export const CityMessages = {
  CREATE_SUMMARY: 'Create a new city',
  CREATE_DESCRIPTION: 'Creates a new city and associates it with a state.',
  CREATE_BODY_DESCRIPTION:
    'The details of the city to be created, including the name and state ID.',

  GET_ALL_SUMMARY: 'Get all cities  (cursor or page-based)',
  GET_ALL_DESCRIPTION:
    'Retrieves all cities along with their associated state and other details.',
  UPDATE_SUMMARY: 'Update an existing city',
  UPDATE_DESCRIPTION:
    'Updates the details of an existing city based on the provided ID.',
  UPDATE_PARAM_DESCRIPTION: 'The ID of the city to be updated.',
  UPDATE_BODY_DESCRIPTION:
    'The updated details of the city, including its name and state ID.',
  COLLEGE_GET_SUMMARY: 'Get a list of colleges based on city and/or state',
  COLLEGE_GET_DESCRIPTION:
    'Fetch colleges filtered by city and/or state names. If no filter is provided, all colleges will be returned.',
  COLLEGE_GET_CITY_DESCRIPTION: 'The city name to filter the colleges by.',
  COLLEGE_GET_STATE_DESCRIPTION: 'The state name to filter the colleges by.',
};

export const CityDtoMessages = {
  NAME_DESCRIPTION: 'The name of the state.',
  STATE_ID_DESCRIPTION: 'The ID of the state where the college is located.',
} as const;
