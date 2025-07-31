import { useCallback, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Trans, useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-1">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-3">
            <a href="/" className="text-1xl font-bold text-primary gap-3 flex items-left">
              <img
                src="https://bestassurbrokers.com/public/assets/img/logo.png"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain bg-white rounded"
              />
              <span>Assurance broker</span>
            </a>
          </div>
          <p className="text-gray-400 mt-1 text-left">
            {t('footer.excellenceText')}
          </p>
          <div className="flex space-x-4 mt-6 text-white">
            <a href="#" className="hover:text-primary0"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary"><FaTwitter /></a>
            <a href="#" className="hover:text-primary"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-primary"><FaInstagram /></a>
          </div>
        </div>

        {/* Navigation rapide */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            {t('navbar.services')}
          </h3>
          <ul className="space-y-3">
            <li><a href="/" className="hover:text-primary">{t('navbar.home')}</a></li>
            <li><a href="/service" className="hover:text-primary">{t('navbar.services')}</a></li>
            <li><a href="/about" className="hover:text-primary">{t('navbar.about')}</a></li>
            <li><a href="/contact" className="hover:text-primary">{t('navbar.contact')}</a></li>
          </ul>
        </div>

        {/* Informations légales */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            {t('about.values.commitmentTitle')}
          </h3>
          <ul className="space-y-3">
            <li><a href="/legal-notice" className="hover:text-primary">{t('footer.legalNotice')}</a></li>
            <li><a href="/politique-cookies" className="hover:text-primary">{t('footer.gdpr')}</a></li>
            <li><a href="/conditions-utilisation" className="hover:text-primary">{t('footer.terms')}</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            {t('footer.paymentsTitle')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <img
                src="/visa.png"
                alt="Visa"
                className="w-10 h-5 object-contain"
              />
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="/paypal.png"
                alt="Visa"
                className="w-10 h-5 object-contain"
              />
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="/mastercard.png"
                alt="Visa"
                className="w-10 h-5 object-contain"
              />
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="/lumicash.png"
                alt="Visa"
                className="w-10 h-5 object-contain"
              />
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="/ecocash.png"
                alt="Visa"
                className="w-10 h-5 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 px-4 text-sm text-gray-500">
        <div className="mb-4">
          <span>
            © {year} Best Digital Insurance Brokers
          </span>
          <p>
            <Trans i18nKey="footer.poweredBy">
              - Powered by <a href="https://gisaanalytica.com" className="hover:text-primary">Best Digital Insurance Brokers</a>
            </Trans>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;