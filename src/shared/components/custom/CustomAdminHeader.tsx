import React, { useRef } from 'react';
import { useSearchParams } from 'react-router';
import { Search, MessageSquare, Sun, Moon, Menu } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { useThemeContext } from '@/shared/hooks/use-theme-context';
import { CustomUserDropdown } from './CustomUserDropdown';
import { NotificationsDropdown } from '@/notifications';

interface HeaderProps {
    onMenuClick: () => void;
}

export const CustomAdminHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {

    const [, setSearchParams] = useSearchParams()
    const { toggleTheme } = useThemeContext();

    const inputRef = useRef<HTMLInputElement>(null)

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        const query = inputRef.current?.value.trim().toLowerCase() ?? '';
        if (!query) {
            setSearchParams(() => '')
            return;
        };

        setSearchParams((prev) => {
            prev.set('query', query);
            return prev;
        })
    }
    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 h-18">
            <div className="flex items-center justify-between gap-4">
                {/* Botón menú mobile - AGREGAR AL INICIO */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <Menu size={24} />
                </button>
                {/* Search */}
                <div className="flex-1 max-w-md hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="relative cursor-pointer p-2 text-gray-600 hover:hover:text-foreground dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </button>

                    <NotificationsDropdown />

                    <button aria-label="Mensajes" className="group cursor-pointer p-2 text-gray-600 dark:text-gray-300 hover:hover:text-foreground dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MessageSquare size={20} className="transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110" />
                    </button>

                    <CustomUserDropdown />

                </div>
            </div>
        </header >
    );
};
