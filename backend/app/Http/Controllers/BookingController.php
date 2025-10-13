<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date'=>'required|date',
            'time'=>'required',
            'party_size'=>'required|integer|min:1',
            'name'=>'required',
            'email'=>'required|email'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $booking = Booking::create(array_merge($request->only(['date','time','party_size','name','email','phone']), ['user_id'=>auth()->id()]));
        return response()->json($booking, 201);
    }

    public function myBookings()
    {
        return response()->json(Booking::where('user_id', auth()->id())->get());
    }

    // Admin methods
    public function index()
    {
        return response()->json(Booking::with('user')->get());
    }

    public function accept($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->status = 'accepted';
        $booking->save();
        return response()->json($booking);
    }

    public function reject($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->status = 'rejected';
        $booking->save();
        return response()->json($booking);
    }
}
