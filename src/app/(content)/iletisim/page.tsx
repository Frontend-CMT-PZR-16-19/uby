export default function Iletisim() {
  return <div className="container mx-auto py-24 space-y-4" >
    <div className="max-w-md">
      <h1 className="text-4xl">
        İletişim Bilgileri
      </h1>

      <div>
        <h2 className="text-lg font-medium">
          Kadıköy
        </h2>
        <p className="">Mühürdar Cad., No:52, Kadıköy, İstanbul, Caferağa Mah.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-medium">
          Mecidiyeköy
        </h2>
        <p>
          Eski Osmanlı Sok., No:40, Şişli, İstanbul, Mecidiyeköy Mah. (Holoğlu iş hanı, 3-4-5)

        </p>
      </div>


      <div>
        <a href="tel:4443111" className="border-b hover:border-primary hover:border-b-2 transition duration-200 text-lg">444 3 111</a>
        <br />
        <a href="mailto:bilgi@ucuncubinyil.com" className="border-b hover:border-primary hover:border-b-2 transition duration-200 text-lg">bilgi@ucuncubinyil.com </a>
      </div>
      <div>
        <h2 className="text-lg font-medium">Sosyal Medya</h2>
        Bizi takip edebileceğiniz sosyal medya hesaplarımız da mevcuttur.{" "}
        <a href="https://www.instagram.com/ucuncubinyil/" target="_blank" className="border-b hover:border-primary hover:border-b-2 transition duration-200 text-lg">Instagram</a>,{" "}
        <a href="https://x.com/ucuncubinyil" target="_blank" className="border-b hover:border-primary hover:border-b-2 transition duration-200 text-lg">X </a>,{" "}
        <a href="https://www.facebook.com/UcuncuBinyil/" target="_blank" className="border-b hover:border-primary hover:border-b-2 transition duration-200 text-lg">Facebook</a>,{" "}
        <a href="https://www.linkedin.com/company/ucuncubinyil" target="_blank" className="border-b hover:border-primary hover:border-b-2 transition duration-200 text-lg">LinkedIn</a>,{" "}
        <a href="https://www.youtube.com/channel/UC4tBCMfJbRmx85X8B4xhyrg" target="_blank" className="border-b hover:border-primary hover:border-b-2 transition duration-200 text-lg">Youtube</a>,{" "}
        <a href="https://api.whatsapp.com/send/?text=%C3%9C%C3%A7%C3%BCnc%C3%BC+Biny%C4%B1l+Akademi+E%C4%9Fitimlerini+%C4%B0nceleyiniz.+https%3A%2F%2Fwww.ucuncubinyil.com&type=custom_url&app_absent=0" target="_blank" className="border-b hover:border-primary hover:border-b-2 transition duration-200 text-lg">Whatsapp</a>,{" "}
      </div>
    </div>
  </div >;
}
