import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEventHandler } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

interface Carrera {
    id: number;
    nombre: string;
}

interface Equipo {
    id: number;
    nombre: string;
}

interface Role {
    id: number;
    nombre: string;
}

interface Participant {
    id: number;
    no_control: string;
    nombre: string;
    correo: string;
    telefono: string;
    usuario: User;
    carrera: Carrera;
    equipos: Equipo[];
}

interface ParticipantsEditProps {
    participant: Participant;
    carreras: Carrera[];
    equipos: Equipo[];
    roles: Role[];
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
    {
        title: 'Edit Participant',
        href: '#',
    },
];

export default function EditParticipant({ participant, carreras, equipos, roles }: ParticipantsEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        name: participant.usuario.name,
        email: participant.usuario.email,
        no_control: participant.no_control,
        carrera_id: String(participant.carrera?.id || ''),
        telefono: participant.telefono,
        role_id: String(participant.usuario.roles[0]?.id || ''), // Assuming one primary role for simplicity
        equipo_id: String(participant.equipos[0]?.id || ''), // Assuming one team for simplicity
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('admin.participants.update', participant.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${participant.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Edit Participant: {participant.nombre}</h2>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                {/* User Details */}
                                <h3 className="text-xl font-semibold mt-8 mb-4">User Information</h3>
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
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

                                {/* Participant Details */}
                                <h3 className="text-xl font-semibold mt-8 mb-4">Participant Information</h3>
                                <div>
                                    <Label htmlFor="no_control">Control Number</Label>
                                    <Input
                                        id="no_control"
                                        type="text"
                                        name="no_control"
                                        value={data.no_control}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('no_control', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.no_control} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="telefono">Phone</Label>
                                    <Input
                                        id="telefono"
                                        type="text"
                                        name="telefono"
                                        value={data.telefono}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('telefono', e.target.value)}
                                    />
                                    <InputError message={errors.telefono} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="carrera_id">Career</Label>
                                    <Select onValueChange={(value) => setData('carrera_id', value)} value={data.carrera_id}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a career" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {carreras.map((carrera) => (
                                                <SelectItem key={carrera.id} value={String(carrera.id)}>
                                                    {carrera.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.carrera_id} className="mt-2" />
                                </div>

                                {/* Role and Team Assignment */}
                                <h3 className="text-xl font-semibold mt-8 mb-4">Assignments</h3>
                                <div>
                                    <Label htmlFor="role_id">User Role</Label>
                                    <Select onValueChange={(value) => setData('role_id', value)} value={data.role_id}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.id} value={String(role.id)}>
                                                    {role.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role_id} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="equipo_id">Team</Label>
                                    <Select onValueChange={(value) => setData('equipo_id', value)} value={data.equipo_id}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a team" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {equipos.map((equipo) => (
                                                <SelectItem key={equipo.id} value={String(equipo.id)}>
                                                    {equipo.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.equipo_id} className="mt-2" />
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
