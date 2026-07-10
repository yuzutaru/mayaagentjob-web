import React from 'react';
import { UserPlus, Upload, Search, CheckCircle2, LucideIcon } from 'lucide-react';
import { HowWeWorkStepContract } from '../../../domain/entities/HomePortalContract';

interface HowWeWorkSectionProps {
  steps: readonly HowWeWorkStepContract[];
}

const iconMap: Record<string, LucideIcon> = {
  'user-plus': UserPlus,
  upload: Upload,
  search: Search,
  'check-circle': CheckCircle2,
};

export const HowWeWorkSection: React.FC<HowWeWorkSectionProps> = ({ steps }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-[#151821]/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How we work
          </h2>
        </div>

        {/* Workflow Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative items-stretch">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.iconName] || UserPlus;
            const isActive = Boolean(step.isActive);

            return (
              <div
                key={step.stepNumber}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connecting Dotted Curve Arrow between steps on large screen */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-6 pointer-events-none z-0">
                    <svg
                      className="w-full h-full text-emerald-500/50"
                      viewBox="0 0 160 30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    >
                      <path d="M10 20 Q 80 -10 150 20" />
                      <path d="M145 15 L 150 20 L 143 23" />
                    </svg>
                  </div>
                )}

                {/* Card Wrapper */}
                <div
                  className={`relative z-10 w-full h-full flex flex-col items-center justify-center p-8 rounded-3xl transition-all duration-300 ${
                    isActive
                      ? 'bg-white dark:bg-white text-slate-900 shadow-2xl shadow-emerald-500/15 scale-105 border border-emerald-500/20'
                      : 'hover:bg-white/60 dark:hover:bg-[#1E222E] text-slate-900 dark:text-white'
                  }`}
                >
                  {/* Icon Circle */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-110 ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                        : 'bg-white dark:bg-[#1E222E] text-emerald-500 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Step Title */}
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      isActive ? 'text-slate-900' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isActive ? 'text-slate-600' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
