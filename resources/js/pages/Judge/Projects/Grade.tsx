import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

interface Criterio {
    id: number;
    nombre: string;
    descripcion: string;
    ponderacion: number;
}

interface Project {
    id: number;
    nombre: string;
    criterios: Criterio[];
}

interface GradeProjectProps {
    project: Project;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Judge Dashboard',
        href: route('judge.dashboard'),
    },
];

export default function GradeProject({ project }: GradeProjectProps) {
    const { data, setData, post, processing, errors } = useForm<{
        grades: Record<number, string>;
        comentarios: string;
    }>({
        grades: {},
        comentarios: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('judge.projects.storeGrade', project.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Grade Project: ${project.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Grade Project: {project.nombre}</h2>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                {project.criterios.map((criterio) => (
                                    <div key={criterio.id}>
                                        <Label htmlFor={`grade-${criterio.id}`}>
                                            {criterio.nombre} ({criterio.ponderacion}%)
                                        </Label>
                                        <Input
                                            id={`grade-${criterio.id}`}
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={data.grades[criterio.id] || ''}
                                            onChange={(e) =>
                                                setData('grades', {
                                                    ...data.grades,
                                                    [criterio.id]: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                        <InputError message={errors[`grades.${criterio.id}` as keyof typeof errors]} className="mt-2" />
                                    </div>
                                ))}

                                <div className="mt-4">
                                    <Label htmlFor="comentarios">Comments</Label>
                                    <Textarea
                                        id="comentarios"
                                        value={data.comentarios}
                                        onChange={(e) => setData('comentarios', e.target.value)}
                                    />
                                    <InputError message={errors.comentarios} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Submit Grade</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}