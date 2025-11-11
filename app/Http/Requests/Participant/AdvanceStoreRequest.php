<?php

namespace App\Http\Requests\Participant;

use Illuminate\Foundation\Http\FormRequest;

class AdvanceStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Ensure the authenticated user is a participant and is part of the project's team
        $user = $this->user();
        if (!$user || !$user->hasRole('participante')) {
            return false;
        }

        $project = $this->route('project');
        if (!$project) {
            return false;
        }

        // Check if the participant is associated with the project's team
        return $user->participante->equipos->contains($project->equipo);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'descripcion' => ['nullable', 'string', 'max:1000'],
            'archivo' => ['required', 'file', 'mimes:pdf,doc,docx,zip', 'max:10240'], // Max 10MB
        ];
    }
}
