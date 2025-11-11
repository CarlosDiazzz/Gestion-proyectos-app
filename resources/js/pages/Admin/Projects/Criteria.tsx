import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEventHandler, useState } from 'react';

interface Criterio {
    id: number;
    nombre: string;
    descripcion: string;
}

interface Project {
    id: number;
    nombre: string;
    criterios: Criterio[];
}

interface ProjectsCriteriaProps {
    project: Project;
    availableCriteria: Criterio[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Manage Projects',
        href: route('admin.projects.index'),
    },
    {
        title: 'Manage Criteria',
        href: '#',
    },
];

export default function ManageProjectCriteria({ project, availableCriteria }: ProjectsCriteriaProps) {
    const { data, setData, patch, processing, errors } = useForm({
        current_criteria: project.criterios.map(c => String(c.id)),
        new_criteria: [] as string[],
    });

    const [selectedNewCriteria, setSelectedNewCriteria] = useState<string[]>([]);

    const handleAddCriteria = () => {
        const criteriaToAdd = selectedNewCriteria.filter(
            (id) => !data.current_criteria.includes(id) && !data.new_criteria.includes(id)
        );
        setData('new_criteria', [...data.new_criteria, ...criteriaToAdd]);
        setSelectedNewCriteria([]); // Clear selection after adding
    };

    const handleRemoveCriteria = (idToRemove: string, isNew: boolean) => {
        if (isNew) {
            setData('new_criteria', data.new_criteria.filter(id => id !== idToRemove));
        } else {
            setData('current_criteria', data.current_criteria.filter(id => id !== idToRemove));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('admin.projects.updateCriteria', project.id), {
            data: {
                criteria_ids: [...data.current_criteria, ...data.new_criteria].map(Number),
            },
        });
    };

    const allSelectedCriteriaIds = [...data.current_criteria, ...data.new_criteria];
    const criteriaOptions = availableCriteria.filter(
        (c) => !allSelectedCriteriaIds.includes(String(c.id))
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Manage Criteria for ${project.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Manage Criteria for Project: {project.nombre}</h2>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                {/* Current Criteria */}
                                <h3 className="text-xl font-semibold mt-8 mb-4">Assigned Criteria</h3>
                                {allSelectedCriteriaIds.length > 0 ? (
                                    <div className="space-y-2">
                                        {allSelectedCriteriaIds.map((criterioId) => {
                                            const criterio = availableCriteria.find(c => String(c.id) === criterioId);
                                            if (!criterio) return null; // Should not happen if data is consistent
                                            const isNew = data.new_criteria.includes(criterioId);
                                            return (
                                                <div key={criterio.id} className="flex items-center justify-between p-2 border rounded-md">
                                                    <span>{criterio.nombre}</span>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleRemoveCriteria(String(criterio.id), isNew)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p>No criteria assigned to this project.</p>
                                )}

                                {/* Add New Criteria */}
                                <h3 className="text-xl font-semibold mt-8 mb-4">Add Criteria</h3>
                                <div className="flex items-center space-x-4">
                                    <Select
                                        onValueChange={(value) => setSelectedNewCriteria(prev => {
                                            if (prev.includes(value)) return prev;
                                            return [...prev, value];
                                        })}
                                        value="" // Reset select value after selection
                                    >
                                        <SelectTrigger className="w-[240px]">
                                            <SelectValue placeholder="Select Criteria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {criteriaOptions.map((criterio) => (
                                                <SelectItem key={criterio.id} value={String(criterio.id)}>
                                                    {criterio.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button type="button" onClick={handleAddCriteria} disabled={selectedNewCriteria.length === 0}>
                                        Add Selected
                                    </Button>
                                </div>
                                <InputError message={errors.criteria_ids} className="mt-2" />

                                <div className="flex items-center gap-4 mt-6">
                                    <Button disabled={processing}>Update Criteria</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
