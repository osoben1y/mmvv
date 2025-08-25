import { memo } from "react";
import facebook from "../../shared/assets/footer/facebook.svg";
import instagram from "../../shared/assets/footer/instagram.svg";
import youtube from "../../shared/assets/footer/youtube.svg";
import clapperboard from "../../shared/assets/footer/clapperboard.svg";
import lenta from "../../shared/assets/footer/lenta.svg";
import sport from "../../shared/assets/footer/sport.svg";
import movie from "../../shared/assets/footer/movie.png";
import question from "../../shared/assets/footer/question.png";
import list from "../../shared/assets/footer/list.svg";
import star from "../../shared/assets/footer/star.svg";
import phone from "../../shared/assets/footer/phone.svg";
import appStore from "../../shared/assets/footer/AppStore.svg";
import googlePlay from "../../shared/assets/footer/GooglePlay.svg";
import Logo from "../../shared/assets/footer/LOGOTYPE.svg";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className=" container mx-auto ">
      <div className="rounded-[15px] text-white p-10 bg-[#111111] dark:bg-[#111111]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="space-y-6">
            <div className="flex justify-center md:justify-start">
              <img src={Logo} alt="Logo" className="w-[112px] h-[36px]" />
            </div>
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <img
                src={googlePlay}
                alt="googlePlay"
                className="w-[150px] h-[44px] cursor-pointer hover:opacity-80 transition-opacity"
              />
              <img
                src={appStore}
                alt="appStore"
                className="w-[150px] h-[44px] cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-medium text-lg">{t('footer.about_us')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <img src={list} alt="list" className="w-6 h-6" />
                  <span>{t('footer.public_offer')}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center md:justify-start gap-3 text-red-500 hover:text-red-400 transition-colors"
                >
                  <img src={star} alt="star" className="w-6 h-6" />
                  <span>
                    <u>{t('footer.advertising')}</u>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <img src={question} alt="question" className="w-6 h-6" />
                  <span>F.A.Q</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <img src={phone} alt="phone" className="w-6 h-6" />
                  <span>{t('footer.contacts')}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-medium text-lg">{t('footer.categories')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <img src={movie} alt="movie" className="w-6 h-6" />
                  <span>{t('footer.cinema')}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <img src={clapperboard} alt="clapperboard" className="w-6 h-6" />
                  <span>{t('footer.theater')}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <img src={lenta} alt="lenta" className="w-6 h-6" />
                  <span>{t('footer.concerts')}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <img src={sport} alt="sport" className="w-6 h-6" />
                  <span>{t('footer.sport')}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <h3 className="font-medium text-lg">{t('footer.contact_us')}</h3>
            <div className="text-red-500 text-xl font-medium">+998 (95) 897-33-38</div>
            <div className="space-y-3">
              <h4 className="font-medium">{t('footer.social_networks')}</h4>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="w-6 h-6" src={instagram} alt="instagram" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="w-6 h-6" src={facebook} alt="facebook" />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="w-6 h-6" src={youtube} alt="youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
