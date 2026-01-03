export class HttpError extends Error {
  public readonly statusCode: number
  public readonly code: string

  constructor(message: string, statusCode: number, code?: string) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
    this.code = code ?? this.getDefaultCode(statusCode)
  }

  private getDefaultCode(status: number): string {
    const codes: Record<number, string> = {
      400: 'BAD_REQUEST',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      500: 'INTERNAL_ERROR',
    }
    return codes[status] ?? 'ERROR'
  }

  static badRequest(message = 'Bad request', code?: string) {
    return new HttpError(message, 400, code)
  }

  static notFound(message = 'Resource not found', code?: string) {
    return new HttpError(message, 404, code)
  }

  static conflict(message = 'Conflict', code?: string) {
    return new HttpError(message, 409, code)
  }

  static unprocessable(message = 'Unprocessable entity', code?: string) {
    return new HttpError(message, 422, code)
  }

  static internal(message = 'Internal server error', code?: string) {
    return new HttpError(message, 500, code)
  }
}