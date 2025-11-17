import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

interface Participant {
    id: number;
    name: string;
    email: string;
    carrera: string;
    semestre: number;
    especialidad: string;
}

interface EditParticipantProps {
    participant: Participant;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Manage Participants',
        href: route('admin.participants.index'),
    },
];

export default function EditParticipant({ participant }: EditParticipantProps) {
    const { data, setData, patch, processing, errors } = useForm({
        name: participant.name,
        email: participant.email,
        carrera: participant.carrera,
        semestre: participant.semestre,
        especialidad: participant.especialidad,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('admin.participants.update', participant.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Participant: ${participant.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Edit Participant: {participant.name}</h2>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="carrera">Carrera</Label>
                                    <Input
                                        id="carrera"
                                        name="carrera"
                                        value={data.carrera}
                                        className="mt-1 block w-full"
                                        autoComplete="carrera"
                                        onChange={(e) => setData('carrera', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.carrera} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="semestre">Semestre</Label>
                                    <Input
                                        id="semestre"
                                        type="number"
                                        name="semestre"
                                        value={data.semestre}
                                        className="mt-1 block w-full"
                                        autoComplete="semestre"
                                        onChange={(e) => setData('semestre', parseInt(e.target.value))}
                                        required
                                    />
                                    <InputError message={errors.semestre} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="especialidad">Especialidad</Label>
                                    <Input
                                        id="especialidad"
                                        name="especialidad"
                                        value={data.especialidad}
                                        className="mt-1 block w-full"
                                        autoComplete="especialidad"
                                        onChange={(e) => setData('especialidad', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.especialidad} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Update Participant</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
