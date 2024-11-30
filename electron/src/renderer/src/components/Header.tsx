import useAboutModal from "../contexts/AboutModalContext"
import ImgAppLogoLarge from "../assets/images/exifoo_logo_large.png"
import SVGInfo from "../assets/icons/Info.svg?react"

export default function Header() {
  const { openModal } = useAboutModal()

  function handleAboutClick() {
    openModal()
  }

  return (
    <div className="flex h-20 items-center justify-between">
      {/* App Logo */}
      <div>
        <a>
          <img src={ImgAppLogoLarge} alt="exifoo" className="w-32" />
        </a>
      </div>
      {/* Icon Section */}
      <div>
        {/* About */}
        <button onClick={handleAboutClick}>
          <SVGInfo className="h-6 w-6 text-neutral-800 transition-colors duration-200 hover:text-neutral-500" />
        </button>
      </div>
    </div>
  )
}
