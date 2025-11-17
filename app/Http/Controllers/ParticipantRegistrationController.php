<?php

namespace App\Http\Controllers;

use App\Models\Participante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ParticipantRegistrationController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/ParticipantRegister');
    }

    public function store(Request $request)
    {
        $request->validate([
            'carrera' => 'required|string|max:255',
            'semestre' => 'required|integer|min:1|max:12',
            'especialidad' => 'required|string|max:255',
        ]);

        Participante::create([
            'user_id' => Auth::id(),
            'carrera' => $request->carrera,
            'semestre' => $request->semestre,
            'especialidad' => $request->especialidad,
        ]);

        return redirect()->route('dashboard');
    }
}
