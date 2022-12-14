enum STATUS_CODE {
  OK = 200,
  REDIRECT = 300,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500
}

export type Payload = {
  email: string
}

export {
  STATUS_CODE
}
