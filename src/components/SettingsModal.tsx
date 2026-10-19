import React from 'react';
import { Settings, X, Sun, Moon, Check } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden transition-colors">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                Cài đặt
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tùy chỉnh hình nền sáng / tối
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Theme Selector */}
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
              Hình nền giao diện:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Option 1: Light Theme */}
              <button
                type="button"
                onClick={() => onThemeChange('light')}
                className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between h-32 ${
                  theme === 'light'
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shadow-2xs">
                    <Sun className="w-4 h-4" />
                  </div>
                  {theme === 'light' && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white block">
                    Giao diện sáng
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    Nền sáng rõ, chuẩn ban ngày
                  </span>
                </div>
              </button>

              {/* Option 2: Dark Theme */}
              <button
                type="button"
                onClick={() => onThemeChange('dark')}
                className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between h-32 ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-slate-800 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-950 text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-8 h-8 rounded-lg bg-indigo-900/80 text-indigo-300 flex items-center justify-center shadow-2xs">
                    <Moon className="w-4 h-4" />
                  </div>
                  {theme === 'dark' && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <span className="font-bold text-sm text-white block">
                    Giao diện tối (test)
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Nền tối dịu mắt, tiết kiệm pin
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
