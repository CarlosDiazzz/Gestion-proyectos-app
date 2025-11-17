<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckParticipantProfile
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // Check if user is authenticated, has the 'participante' role, and does not have a participant profile
        if ($user && $user->hasRole('participante') && !$user->participante) {
            // Avoid redirect loop
            if ($request->route()->getName() !== 'participant.registration.create' && $request->route()->getName() !== 'participant.registration.store') {
                return redirect()->route('participant.registration.create');
            }
        }

        return $next($request);
    }
}
