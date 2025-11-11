<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TeamUpdateRequest extends FormRequest
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
        $team = $this->route('team'); // Get the team from the route

        return [
            'nombre' => ['required', 'string', 'max:255', Rule::unique('equipos', 'nombre')->ignore($team->id)],
            'codigo_registro' => ['required', 'string', 'max:255', Rule::unique('equipos', 'codigo_registro')->ignore($team->id)],

            // Validation for current team participants
            'current_team_participants' => ['array'],
            'current_team_participants.*.participant_id' => ['required', 'exists:participantes,id'],
            'current_team_participants.*.perfil_id' => ['required', 'exists:perfiles,id'],

            // Validation for new participants to add
            'new_participants' => ['array'],
            'new_participants.*.participant_id' => ['required', 'exists:participantes,id', Rule::unique('participante_equipo', 'participante_id')->where(function ($query) use ($team) {
                return $query->where('equipo_id', '!=', $team->id); // Ensure participant is not already in another team
            })],
            'new_participants.*.perfil_id' => ['required', 'exists:perfiles,id'],
        ];
    }
}
