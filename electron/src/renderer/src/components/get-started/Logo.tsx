import ImgAppLogoLarge from "../../assets/images/exifoo_logo_large.png"

export default function Logo() {
  return (
    <div className="flex justify-center">
      <img src={ImgAppLogoLarge} alt="exifoo_logo" className="w-36" />
    </div>
  )
}
