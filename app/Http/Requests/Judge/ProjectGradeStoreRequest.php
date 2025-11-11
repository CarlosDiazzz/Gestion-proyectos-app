<?php

namespace App\Http\Requests\Judge;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ProjectGradeStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();
        if (!$user || !$user->hasRole('juez')) {
            return false;
        }

        $project = $this->route('project');
        if (!$project) {
            return false;
        }

        // Check if the authenticated judge is assigned to this project
        return $user->juez->proyectos->contains($project);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $project = $this->route('project');
        $rules = [
            'comentarios' => ['nullable', 'string', 'max:1000'],
        ];

        foreach ($project->criterios as $criterio) {
            $rules['grades.' . $criterio->id] = ['required', 'numeric', 'min:0', 'max:100'];
        }

        return $rules;
    }
}
