enum STATUS_CODE {
  OK = 200,
  REDIRECT = 300,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500
}

export type Payload = {
  userId: string
}

export {
  STATUS_CODE
}
