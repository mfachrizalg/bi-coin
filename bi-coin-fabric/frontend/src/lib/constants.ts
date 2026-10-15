export const ParticipantType = {
  DISTRIBUTOR: 'distributor',
  OBSERVER: 'observer',
  PJP: 'pjp',
} as const

export type ParticipantTypeValue = (typeof ParticipantType)[keyof typeof ParticipantType]

export const ParticipantTypeLabel: Record<string, string> = {
  distributor: 'Distributor Bank',
  observer: 'Observer',
  pjp: 'PJP',
}
