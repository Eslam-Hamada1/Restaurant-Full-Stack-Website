<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model {
    use HasFactory;
    protected $fillable = ['user_id','name','email','phone','date','time','party_size','status'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
