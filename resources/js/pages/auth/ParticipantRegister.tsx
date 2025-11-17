import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { type FormEventHandler } from 'react';
import { route } from 'ziggy-js';

export default function ParticipantRegister() {
    const { data, setData, post, processing, errors } = useForm({
        carrera: '',
        semestre: '',
        especialidad: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('participant.registration.store'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
                    <CardDescription>
                        Please provide some additional information to complete your registration as a participant.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="carrera">Carrera</Label>
                            <Input
                                id="carrera"
                                value={data.carrera}
                                onChange={(e) => setData('carrera', e.target.value)}
                                required
                            />
                            {errors.carrera && <p className="text-sm text-red-500">{errors.carrera}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="semestre">Semestre</Label>
                            <Input
                                id="semestre"
                                type="number"
                                value={data.semestre}
                                onChange={(e) => setData('semestre', e.target.value)}
                                required
                            />
                            {errors.semestre && <p className="text-sm text-red-500">{errors.semestre}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="especialidad">Especialidad</Label>
                            <Input
                                id="especialidad"
                                value={data.especialidad}
                                onChange={(e) => setData('especialidad', e.target.value)}
                                required
                            />
                            {errors.especialidad && <p className="text-sm text-red-500">{errors.especialidad}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}