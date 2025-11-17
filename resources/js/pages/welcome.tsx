import { Link, Head } from '@inertiajs/react';
import { Calendar } from '@/components/ui/calendar';
import { route } from 'ziggy-js';

export default function Welcome({ canRegister }: { canRegister: boolean }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
                <header className="flex justify-between items-center p-6">
                    <div className="flex items-center">
                        {/* <ApplicationLogo className="h-12 w-auto text-gray-500" /> */}
                    </div>
                    <nav>
                        <Link
                            href={route('login')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Log in
                        </Link>
                        {canRegister && (
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        )}
                    </nav>
                </header>

                <main className="flex-grow flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                            Project Management System
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            A simple and intuitive platform to manage your projects.
                        </p>
                    </div>

                    <div className="mt-12">
                        <Calendar
                            events={[]}
                        />
                    </div>
                </main>

                <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Laravel v{import.meta.env.VITE_LARAVEL_VERSION} (PHP v{import.meta.env.VITE_PHP_VERSION})
                </footer>
            </div>
        </>
    );
}
