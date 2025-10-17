<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'role'=>'user'
        ]);
        $token = JWTAuth::fromUser($user);
        return response()->json(['user'=>$user, 'token'=>$token], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email','password');
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error'=>'Invalid credentials'], 401);
        }
        return response()->json(['token'=>$token, 'user'=>Auth::user()]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message'=>'Logged out']);
    }

    public function user()
    {
        return response()->json(Auth::user());
    }

public function updateProfile(Request $request)
{
    /** @var User $user */
    $user = Auth::user();

    if (! $user) {
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
        'password' => 'nullable|min:6|confirmed',
        'phone' => 'nullable|string|max:20',
    ]);

    $data = $request->only(['name', 'email', 'phone']);
    if ($request->filled('password')) {
        $data['password'] = bcrypt($request->password);
    }

    $user->update($data);

    return response()->json([
        'message' => 'Profile updated successfully',
        'user' => $user->fresh(),
    ]);
}

}
