<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Juez;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JudgeController extends Controller
{
    /**
     * Display a listing of the judges.
     */
    public function index(): Response
    {
        $judges = Juez::with(['usuario', 'especialidad'])->get();

        return Inertia::render('Admin/Judges/Index', [
            'judges' => $judges,
        ]);
    }

    /**
     * Display the specified judge.
     */
    public function show(Juez $judge): Response
    {
        $judge->load(['usuario', 'especialidad']);

        return Inertia::render('Admin/Judges/Show', [
            'judge' => $judge,
        ]);
    }
}
