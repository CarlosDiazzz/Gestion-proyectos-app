import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';

interface Project {
    id: number;
    nombre: string;
}

interface AdvancesCreateProps {
    project: Project;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Participant Dashboard',
        href: route('participant.dashboard'),
    },
    {
        title: 'Upload Advance',
        href: '#',
    },
];

export default function CreateAdvance({ project }: AdvancesCreateProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        descripcion: '',
        archivo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('participant.projects.advances.store', project.id), {
            onSuccess: () => reset('descripcion', 'archivo'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Upload Advance for ${project.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Upload Advance for Project: {project.nombre}</h2>

                            <form onSubmit={submit} className="mt-6 space-y-6">
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

                                <div>
                                    <Label htmlFor="archivo">File</Label>
                                    <Input
                                        id="archivo"
                                        type="file"
                                        name="archivo"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('archivo', e.target.files ? e.target.files[0] : null)}
                                        required
                                    />
                                    <InputError message={errors.archivo} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Upload Advance</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
