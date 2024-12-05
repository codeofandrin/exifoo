import useAboutModalContext from "../contexts/AboutModalContext"
import ImgAppLogoLarge from "../assets/images/exifoo_logo_large.png"
import SVGInfo from "../assets/icons/Info.svg?react"

export default function Header() {
  const { openModal } = useAboutModalContext()

  function handleAboutClick() {
    openModal()
  }

  return (
    <div className="flex h-fit items-center justify-between py-6">
      {/* App Logo */}
      <div>
        <a>
          <img src={ImgAppLogoLarge} alt="exifoo" className="w-32" />
        </a>
      </div>
      {/* Icon Section */}
      <div>
        {/* About */}
        <button
          onClick={handleAboutClick}
          className="rounded-lg border border-neutral-300 p-1.5 transition-colors duration-200 hover:bg-neutral-100">
          <SVGInfo className="h-4 w-4 text-neutral-800" />
        </button>
      </div>
    </div>
  )
}
