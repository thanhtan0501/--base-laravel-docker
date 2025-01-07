<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response|\Inertia\ResponseFactory
    {
        try {
            $request->validate([
                'field'     => Rule::in(['updated_at', 'created_at', 'full_name']),
                'direction' => Rule::in(['asc', 'desc']),
            ]);
            $limit = $request->input('limit', default: 10);
            $users = UserResource::collection(
                User::query()
                    ->whereNot("id", auth()->id())
                    ->when(
                        value: $request->search,
                        callback: fn($query, $value) => $query
                            ->where('full_name', 'like', '%' . $value . '%')
                        // ->orWhere('code', 'like', '%' . $value . '%')
                    )
                    ->when(
                        value: $request->field && $request->direction,
                        callback: fn($query) => $query->orderBy($request->field, $request->direction),
                        default: fn($query) => $query->latest()
                    )
                    ->paginate($limit)
                    ->withQueryString()
            );

            return inertia(
                "User/Index",
                [
                    'listData' => $users,
                    "state" => $request->only('limit', 'page', 'search', 'field', 'direction')
                ]
            );
        } catch (\Throwable $th) {
            // throw $th;

            return inertia("User/Index", [
                'listData' => fn() => [],
                'state'      => $request->only('limit', 'page', 'search', 'field', 'direction')
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $validator = $this->validation($data);
            if (!$validator) {
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function validation($data)
    {
        $validator = Validator::make($data, [
            'email' => 'required'
        ]);
        if ($validator->failed()) {
            return $validator;
        } else {
            return true;
        }
    }
}
