import React from 'react';
import {
  Briefcase,
  PhoneCall,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
} from 'lucide-react';
import { FooterColumnContract, QuickLinkItemContract } from '../../../domain/entities/HomePortalContract';

interface HomeFooterProps {
  columns: readonly FooterColumnContract[];
}

export const HomeFooter: React.FC<HomeFooterProps> = ({ columns }) => {
  return (
    <footer className="bg-slate-900 dark:bg-[#07080B] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800">
          {/* Brand Info & Phone Call */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">
                  Maya
                </span>
                <span className="text-[11px] font-medium text-emerald-400">
                  Asisten cari kerja Kamu
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Call now:</span>
              <a
                href="tel:3195550115"
                className="font-bold text-white hover:text-emerald-400 transition-colors"
              >
                (319) 555-0115
              </a>
            </div>
            <p className="text-xs text-slate-500 max-w-xs mt-2">
              Building connections, bridging career opportunities with AI assistance.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold text-white tracking-wide uppercase mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link: QuickLinkItemContract) => {
                    const isHighlighted = Boolean(link.isHighlighted);

                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className={`transition-colors ${
                            isHighlighted
                              ? 'text-emerald-400 font-semibold flex items-center gap-1'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Maya - Asisten cari kerja Kamu. All rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="#facebook"
              aria-label="Facebook"
              className="hover:text-emerald-400 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#youtube"
              aria-label="YouTube"
              className="hover:text-emerald-400 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#instagram"
              aria-label="Instagram"
              className="hover:text-emerald-400 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#twitter"
              aria-label="Twitter"
              className="hover:text-emerald-400 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
