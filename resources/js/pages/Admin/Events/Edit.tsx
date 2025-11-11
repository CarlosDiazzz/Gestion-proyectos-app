import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';

interface Event {
    id: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    descripcion: string;
}

interface EventsEditProps {
    event: Event;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Manage Events',
        href: route('admin.events.index'),
    },
    {
        title: 'Edit Event',
        href: '#',
    },
];

export default function EditEvent({ event }: EventsEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        nombre: event.nombre,
        fecha_inicio: event.fecha_inicio,
        fecha_fin: event.fecha_fin,
        descripcion: event.descripcion,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('admin.events.update', event.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${event.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Edit Event: {event.nombre}</h2>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <Label htmlFor="nombre">Event Name</Label>
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
                                    <Label htmlFor="fecha_inicio">Start Date</Label>
                                    <Input
                                        id="fecha_inicio"
                                        type="date"
                                        name="fecha_inicio"
                                        value={data.fecha_inicio}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('fecha_inicio', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.fecha_inicio} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="fecha_fin">End Date</Label>
                                    <Input
                                        id="fecha_fin"
                                        type="date"
                                        name="fecha_fin"
                                        value={data.fecha_fin}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('fecha_fin', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.fecha_fin} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="descripcion">Description</Label>
                                    <Textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={data.descripcion}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                    />
                                    <InputError message={errors.descripcion} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Update Event</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
