import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

interface Team {
    id: number;
    nombre: string;
}

interface EditTeamProps {
    team: Team;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Manage Teams',
        href: route('admin.teams.index'),
    },
];

export default function EditTeam({ team }: EditTeamProps) {
    const { data, setData, patch, processing, errors } = useForm({
        nombre: team.nombre,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('admin.teams.update', team.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Team: ${team.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Edit Team: {team.nombre}</h2>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <Label htmlFor="nombre">Team Name</Label>
                                    <Input
                                        id="nombre"
                                        name="nombre"
                                        value={data.nombre}
                                        className="mt-1 block w-full"
                                        autoComplete="nombre"
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nombre} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Update Team</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
