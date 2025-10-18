<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller {
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user'
        ]);

        // Send verification email
        event(new Registered($user));

        return response()->json([
            'message' => 'Registration successful. Please verify your email to continue.'
        ], 201);
    }

public function login(Request $request) {
    $credentials = $request->only('email', 'password');

    if (!$token = JWTAuth::attempt($credentials)) {
        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    $user = Auth::user();

    if (empty($user->email_verified_at)) {
        Auth::logout();
        return response()->json([
            'message' => 'Please verify your email before logging in.'
        ], 403);
    }

    return response()->json([
        'token' => $token,
        'user' => $user
    ]);
}

    public function logout() {
        Auth::logout();
        return response()->json(['message'=>'Logged out']);
    }

    public function user() {
        return response()->json(Auth::user());
    }

    public function updateProfile(Request $request) {
        /** @var User $user */
        $user = Auth::user();

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'old_password' => 'nullable|string',
            'password' => 'nullable|min:6|confirmed',
        ]);

        // fields
        $data = $request->only(['name', 'email', 'phone']);

        if ($request->filled('password')) {
            // old password empty check
            if (!$request->filled('old_password')) {
                return response()->json([
                    'message' => 'You must provide your current password.'
                ], 422);
            }

            // old password matches database check
            if (!Hash::check($request->old_password, $user->password)) {
                return response()->json([
                    'message' => 'The current password you entered is incorrect.'
                ], 403);
            }

            // update new password
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }
}
