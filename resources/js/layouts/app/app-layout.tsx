import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header'; // Import AppHeader
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppLayout({ // Renamed from AppSidebarLayout
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="header">
            <AppHeader />
            <AppContent variant="header" className="overflow-x-hidden">
                {/* AppSidebarHeader removed, its functionality might be integrated into AppHeader or handled elsewhere */}
                {children}
            </AppContent>
        </AppShell>
    );
}
