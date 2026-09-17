export const ParticipantType = {
  VALIDATOR: 'validator',
  OBSERVER: 'observer',
  PJP: 'pjp',
} as const

export type ParticipantTypeValue = (typeof ParticipantType)[keyof typeof ParticipantType]

export const ParticipantTypeLabel: Record<string, string> = {
  validator: 'Validator Bank',
  observer: 'Observer',
  pjp: 'PJP',
}
