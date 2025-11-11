<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ParticipantUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // AdminMiddleware already checks for admin role
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $participant = $this->route('participant'); // Get the participant from the route

        return [
            // User details
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('usuarios', 'email')->ignore($participant->usuario->id)],
            'role_id' => ['required', 'exists:roles,id'],

            // Participant details
            'no_control' => ['required', 'string', 'max:255', Rule::unique('participantes', 'no_control')->ignore($participant->id)],
            'carrera_id' => ['required', 'exists:carreras,id'],
            'telefono' => ['nullable', 'string', 'max:255'],
            'equipo_id' => ['nullable', 'exists:equipos,id'],
        ];
    }
}
