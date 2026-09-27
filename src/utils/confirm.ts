export const confirmDestructiveAction = (
  message: string,
  confirmImpl: (prompt: string) => boolean = (prompt) => window.confirm(prompt),
): boolean => confirmImpl(message)
