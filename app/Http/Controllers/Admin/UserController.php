<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserStoreRequest; // Import the UserStoreRequest
use App\Models\Rol;
use App\Models\User; // Import the User model
use Illuminate\Support\Facades\Hash; // Import Hash facade
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse; // Import RedirectResponse

class UserController extends Controller
{
    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        $roles = Rol::all();

        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(UserStoreRequest $request): RedirectResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_active' => true, // Default to active
        ]);

        $role = Rol::find($request->role_id);
        if ($role) {
            $user->roles()->attach($role);
        }

        return to_route('admin.dashboard')->with('success', 'User created successfully.');
    }
}
