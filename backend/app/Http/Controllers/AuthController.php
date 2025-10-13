<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

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
        return response()->json(['token'=>$token, 'user'=>auth()->user()]);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message'=>'Logged out']);
    }

    public function user()
    {
        return response()->json(auth()->user());
    }
}
