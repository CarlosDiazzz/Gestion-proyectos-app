import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from '@inertiajs/react';
import { type FormEventHandler } from 'react';
import { route } from 'ziggy-js';
import InputError from '@/components/input-error';

export default function RoleSelection() {
    const { data, setData, post, processing, errors } = useForm({
        role: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('role.selection.store'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Select Your Role</CardTitle>
                    <CardDescription>
                        Please select how you would like to use the application.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Button
                                type="button"
                                variant={data.role === 'participant' ? 'default' : 'outline'}
                                onClick={() => setData('role', 'participant')}
                            >
                                Participant
                            </Button>
                            <Button
                                type="button"
                                variant={data.role === 'judge' ? 'default' : 'outline'}
                                onClick={() => setData('role', 'judge')}
                            >
                                Judge
                            </Button>
                        </div>
                        <InputError message={errors.role} className="mt-2" />
                        <Button type="submit" className="w-full" disabled={processing || !data.role}>
                            {processing ? 'Saving...' : 'Continue'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}