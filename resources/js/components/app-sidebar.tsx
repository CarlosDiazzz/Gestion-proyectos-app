import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react'; // Import usePage
import { BookOpen, Folder, LayoutGrid, UserCog, Users } from 'lucide-react'; // Import new icons
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props as any; // Access auth data from Inertia page props

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
    ];

    if (auth.user && auth.user.roles.some((role: { nombre: string }) => role.nombre === 'administrador')) {
        mainNavItems.push(
            {
                title: 'Admin Dashboard',
                href: route('admin.dashboard'),
                icon: UserCog,
            },
            {
                title: 'Manage Users',
                href: route('admin.users.create'), // Link to user creation for now, can be changed to index later
                icon: Users,
            },
            {
                title: 'Manage Participants',
                href: route('admin.participants.index'),
                icon: Users,
            },
            {
                title: 'Manage Teams',
                href: route('admin.teams.index'),
                icon: Users,
            },
            {
                title: 'Manage Projects',
                href: route('admin.projects.index'),
                icon: Folder,
            },
            {
                title: 'Manage Judges',
                href: route('admin.judges.index'),
                icon: Users,
            },
            {
                title: 'Manage Events',
                href: route('admin.events.index'),
                icon: BookOpen,
            },
        );
    }

    if (auth.user && auth.user.roles.some((role: { nombre: string }) => role.nombre === 'participante')) {
        mainNavItems.push(
            {
                title: 'Participant Dashboard',
                href: route('participant.dashboard'),
                icon: Users, // Use an appropriate icon
            },
            {
                title: 'Events',
                href: route('participant.events.index'),
                icon: BookOpen, // Use an appropriate icon
            },
            {
                title: 'Certifications',
                href: route('participant.certifications.index'),
                icon: BookOpen, // Use an appropriate icon
            },
        );
    }

    if (auth.user && auth.user.roles.some((role: { nombre: string }) => role.nombre === 'juez')) {
        mainNavItems.push(
            {
                title: 'Judge Dashboard',
                href: route('judge.dashboard'),
                icon: UserCog, // Use an appropriate icon
            },
            {
                title: 'Events',
                href: route('judge.events.index'),
                icon: BookOpen, // Use an appropriate icon
            },
        );
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
