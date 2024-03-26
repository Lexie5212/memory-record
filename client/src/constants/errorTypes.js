export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    INVALID_CREDENTIALS: 'invalid-credentials',
    USER_EXIST: 'user-exist',
    PASSWORD_NOT_MATCH: 'password-not-match',
 
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    GOOGLE_AUTH_FAILED: 'googleLoginFailed',
    UNKNOWN_ACTION: 'unknownAction',
};

export const MESSAGES = {
    // The [] below uses the variable value as the key
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [CLIENT.GOOGLE_AUTH_FAILED]:'Failed to sign in with Google. Please try again or use another sign-in method.',
    [SERVER.INVALID_CREDENTIALS]: 'Your username/password is wrong, please try again.',
    [SERVER.USER_EXIST]: 'User already exists. Please sign in!',
    [SERVER.PASSWORD_NOT_MATCH]: 'Your confirm password is not right, please type again',
    [SERVER.AUTH_MISSING]: 'User does not exist. Please sign up!',
    default: 'Something went wrong.  Please try again',
};
