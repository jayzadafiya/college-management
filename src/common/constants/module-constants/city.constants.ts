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
};

export const CityDtoMessages = {
  NAME_DESCRIPTION: 'The name of the state.',
  STATE_ID_DESCRIPTION: 'The ID of the state where the college is located.',
} as const;
