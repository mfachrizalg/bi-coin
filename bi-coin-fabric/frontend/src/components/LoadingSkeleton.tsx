export type SkeletonKind = 'metrics' | 'table' | 'list' | 'form'

interface Props {
  kind: SkeletonKind
  label: string
  rows?: number
}

export default function LoadingSkeleton({ kind, label, rows = 4 }: Props) {
  if (kind === 'metrics') {
    return (
      <div className="skeleton-grid" role="status" aria-label={label}>
        {Array.from({ length: 4 }, (_, index) => (
          <div className="skeleton-card" aria-hidden="true" key={index}>
            <span className="skeleton-block short" />
            <span className="skeleton-block medium" />
            <span className="skeleton-block short" />
          </div>
        ))}
      </div>
    )
  }

  if (kind === 'table') {
    return (
      <div className="skeleton-stack" role="status" aria-label={label}>
        {Array.from({ length: rows }, (_, index) => <div className="skeleton-row" aria-hidden="true" key={index} />)}
      </div>
    )
  }

  if (kind === 'list') {
    return (
      <div className="skeleton-stack" role="status" aria-label={label}>
        {Array.from({ length: rows }, (_, index) => (
          <div className="skeleton-card" aria-hidden="true" key={index}>
            <span className="skeleton-block medium" />
            <span className="skeleton-block short" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="skeleton-stack" role="status" aria-label={label}>
      {Array.from({ length: rows }, (_, index) => <span className="skeleton-block tall" aria-hidden="true" key={index} />)}
    </div>
  )
}
