<?php

namespace App\Http\Requests\Participant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TeamStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Ensure the authenticated user is a participant
        $user = $this->user();
        return $user && $user->hasRole('participante');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255', 'unique:equipos,nombre'],
            'participantes' => ['required', 'array', 'min:2', 'max:5'],
            'participantes.*' => ['exists:participantes,id'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre del equipo es obligatorio.',
            'nombre.unique' => 'Ya existe un equipo con este nombre.',
            'participantes.required' => 'Debe seleccionar entre 2 y 5 participantes.',
            'participantes.min' => 'Debe seleccionar al menos 2 participantes.',
            'participantes.max' => 'No puede seleccionar más de 5 participantes.',
            'participantes.*.exists' => 'Uno o más participantes seleccionados no son válidos.',
        ];
    }
}
