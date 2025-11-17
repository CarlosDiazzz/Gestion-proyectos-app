import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent>
                <AppHeader />
                <main className="flex-1 px-6 pb-6">{children}</main>
            </AppContent>
        </AppShell>
    );
}