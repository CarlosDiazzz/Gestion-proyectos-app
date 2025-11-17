import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

interface Project {
    id: number;
    nombre: string;
}

interface CreateAdvanceProps {
    project: Project;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Participant Dashboard',
        href: route('participant.dashboard'),
    },
];

export default function CreateAdvance({ project }: CreateAdvanceProps) {
    const { data, setData, post, processing, errors } = useForm({
        descripcion: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('participant.projects.advances.store', project.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Submit Advance for ${project.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Submit Advance for {project.nombre}</h2>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <Label htmlFor="descripcion">Description</Label>
                                    <Textarea
                                        id="descripcion"
                                        value={data.descripcion}
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.descripcion} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Submit Advance</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
