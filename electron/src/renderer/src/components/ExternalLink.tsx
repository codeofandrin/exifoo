import SVGExternalLink from "../assets/icons/ExternalLink.svg?react"

interface ExternalLinkPropsType {
  children?: any
  href: string
  className?: string
  title?: string
  displayIcon?: boolean
}

export default function ExternalLink({
  children,
  href,
  className,
  title,
  displayIcon = false
}: ExternalLinkPropsType) {
  return (
    <a
      href={href}
      target="_blank"
      className={`${className} text-primary-500 underline transition-colors duration-200 hover:text-primary-700`}
      title={title}>
      {displayIcon ? (
        <div className="flex items-center">
          {children}
          <SVGExternalLink className="ml-0.5 w-3" />
        </div>
      ) : (
        <p>{children}</p>
      )}
    </a>
  )
}
