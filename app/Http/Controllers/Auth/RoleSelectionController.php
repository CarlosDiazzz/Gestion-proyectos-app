<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RoleSelectionController extends Controller
{
    /**
     * Display the role selection page.
     */
    public function show(): Response
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login');
        }
        
        $user = Auth::user();
        $roles = $user->roles->pluck('nombre');
        
        // If user has only one role, redirect to appropriate dashboard
        if ($roles->count() == 1) {
            $role = $roles->first();
            request()->session()->put('selected_role', $role);
            
            switch ($role) {
                case 'administrador':
                    return redirect()->route('admin.dashboard');
                case 'juez':
                    return redirect()->route('judge.dashboard');
                case 'participante':
                    return redirect()->route('participant.dashboard');
                default:
                    return redirect()->route('dashboard');
            }
        }
        
        return Inertia::render('Auth/RoleSelection', [
            'roles' => $roles,
        ]);
    }
    
    /**
     * Process the role selection.
     */
    public function store(Request $request)
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login');
        }
        
        $request->validate([
            'role' => 'required|string|exists:roles,nombre',
        ]);
        
        $user = Auth::user();
        
        // Store the selected role in the session
        $request->session()->put('selected_role', $request->input('role'));
        
        // Redirect to the appropriate dashboard based on the selected role
        switch ($request->input('role')) {
            case 'administrador':
                return redirect()->route('admin.dashboard');
            case 'juez':
                return redirect()->route('judge.dashboard');
            case 'participante':
                return redirect()->route('participant.dashboard');
            default:
                return redirect()->route('dashboard');
        }
    }
}
