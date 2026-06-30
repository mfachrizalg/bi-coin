export const ParticipantType = {
  VALIDATOR: 'validator',
  OBSERVER: 'observer',
  PJP: 'pjp',
} as const

export type ParticipantTypeValue = (typeof ParticipantType)[keyof typeof ParticipantType]

export const ParticipantTypeLabel: Record<string, string> = {
  validator: 'Bank / Validator',
  observer: 'Observer',
  pjp: 'PJP (Payment Service Provider)',
}

export const ParticipantTypeColor: Record<string, string> = {
  validator: '#16a34a',
  observer: '#6b7280',
  pjp: '#2563eb',
}
