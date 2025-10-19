<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;

class MenuController extends Controller {
    // public menu
    public function index() {
        return response()->json(MenuItem::all());
    }

    public function show($id) {
        return response()->json(MenuItem::findOrFail($id));
    }

    // admin methods
    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|string'
        ]);

        $item = MenuItem::create($data);
        return response()->json([
            'message' => 'Menu item created successfully',
            'menu' => $item
        ], 201);
    }

    public function update(Request $request, $id) {
        $item = MenuItem::findOrFail($id);

        $item->update($request->only(['title','description','price','image_url']));

        return response()->json([
            'message' => 'Menu item updated successfully',
            'menu' => $item
        ]);
    }

    public function destroy($id) {
        MenuItem::destroy($id);
        return response()->json(['message' => 'Menu item deleted successfully']);
    }
}
