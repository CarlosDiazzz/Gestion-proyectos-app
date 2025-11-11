import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select components
import { FormEventHandler, useState } from 'react'; // Import useState

interface Carrera {
    id: number;
    nombre: string;
}

interface Participant {
    id: number;
    no_control: string;
    nombre: string;
    correo: string;
    telefono: string;
    carrera: Carrera;
    pivot?: {
        perfil_id: number;
    };
}

interface Perfil {
    id: number;
    nombre: string;
}

interface Team {
    id: number;
    nombre: string;
    codigo_registro: string;
    participantes: Participant[]; // Add participants to Team interface
}

interface TeamsEditProps {
    team: Team;
    availableParticipants: Participant[]; // Participants not in any team or in this team
    perfiles: Perfil[];
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
    {
        title: 'Edit Team',
        href: '#',
    },
];

export default function EditTeam({ team, availableParticipants, perfiles }: TeamsEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        nombre: team.nombre,
        codigo_registro: team.codigo_registro,
        // Map current participants to a format suitable for form state
        current_team_participants: team.participantes.map(p => ({
            participant_id: p.id,
            perfil_id: String(p.pivot?.perfil_id || ''),
            nombre: p.nombre,
            carrera: p.carrera.nombre,
        })),
        new_participants: [] as { participant_id: string; perfil_id: string }[],
    });

    const addParticipant = () => {
        setData('new_participants', [...data.new_participants, { participant_id: '', perfil_id: '' }]);
    };

    const removeParticipant = (index: number, isNew: boolean) => {
        if (isNew) {
            const updatedNewParticipants = [...data.new_participants];
            updatedNewParticipants.splice(index, 1);
            setData('new_participants', updatedNewParticipants);
        } else {
            const updatedCurrentParticipants = [...data.current_team_participants];
            updatedCurrentParticipants.splice(index, 1);
            setData('current_team_participants', updatedCurrentParticipants);
        }
    };

    const handleNewParticipantChange = (index: number, field: 'participant_id' | 'perfil_id', value: string) => {
        const updatedNewParticipants = [...data.new_participants];
        updatedNewParticipants[index] = { ...updatedNewParticipants[index], [field]: value };
        setData('new_participants', updatedNewParticipants);
    };

    const handleCurrentParticipantRoleChange = (index: number, value: string) => {
        const updatedCurrentParticipants = [...data.current_team_participants];
        updatedCurrentParticipants[index] = { ...updatedCurrentParticipants[index], perfil_id: value };
        setData('current_team_participants', updatedCurrentParticipants);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('admin.teams.update', team.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${team.nombre}`} />
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
                                        type="text"
                                        name="nombre"
                                        value={data.nombre}
                                        className="mt-1 block w-full"
                                        autoComplete="nombre"
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nombre} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="codigo_registro">Registration Code</Label>
                                    <Input
                                        id="codigo_registro"
                                        type="text"
                                        name="codigo_registro"
                                        value={data.codigo_registro}
                                        className="mt-1 block w-full"
                                        autoComplete="codigo_registro"
                                        onChange={(e) => setData('codigo_registro', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.codigo_registro} className="mt-2" />
                                </div>

                                {/* Current Participants */}
                                <h3 className="text-xl font-semibold mt-8 mb-4">Current Team Members</h3>
                                {data.current_team_participants.length > 0 ? (
                                    <div className="space-y-4">
                                        {data.current_team_participants.map((p, index) => (
                                            <div key={p.participant_id} className="flex items-center space-x-4">
                                                <p className="flex-1">{p.nombre} ({p.carrera})</p>
                                                <Select
                                                    onValueChange={(value) => handleCurrentParticipantRoleChange(index, value)}
                                                    value={p.perfil_id}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select Role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {perfiles.map((perfil) => (
                                                            <SelectItem key={perfil.id} value={String(perfil.id)}>
                                                                {perfil.nombre}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button type="button" variant="destructive" onClick={() => removeParticipant(index, false)}>Remove</Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No participants currently in this team.</p>
                                )}

                                {/* Add New Participants */}
                                <h3 className="text-xl font-semibold mt-8 mb-4">Add New Team Members</h3>
                                <Button type="button" onClick={addParticipant}>Add Participant</Button>
                                <div className="space-y-4 mt-4">
                                    {data.new_participants.map((newP, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            <Select
                                                onValueChange={(value) => handleNewParticipantChange(index, 'participant_id', value)}
                                                value={newP.participant_id}
                                            >
                                                <SelectTrigger className="w-[240px]">
                                                    <SelectValue placeholder="Select Participant" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableParticipants.map((ap) => (
                                                        <SelectItem key={ap.id} value={String(ap.id)}>
                                                            {ap.nombre} ({ap.carrera.nombre})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select
                                                onValueChange={(value) => handleNewParticipantChange(index, 'perfil_id', value)}
                                                value={newP.perfil_id}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {perfiles.map((perfil) => (
                                                        <SelectItem key={perfil.id} value={String(perfil.id)}>
                                                            {perfil.nombre}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Button type="button" variant="destructive" onClick={() => removeParticipant(index, true)}>Remove</Button>
                                            <InputError message={errors[`new_participants.${index}.participant_id`]} className="mt-2" />
                                            <InputError message={errors[`new_participants.${index}.perfil_id`]} className="mt-2" />
                                        </div>
                                    ))}
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
